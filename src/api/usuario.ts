import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const usuario = Router();
usuario.post('/login', (req: Request, res: Response) => {
    let { idEmpresa, usuario, clave } = req.body;

    const query = `CALL Usuario_Autentication(${ idEmpresa}, '${ usuario }', '${ clave }')`;
    MySQL.ejecutarQuery(query, (err: any, usuarioLogin: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessage = usuarioLogin[0][0].ErrorMessage;
        if (errorMessage == '') {
            req.session!.userSesion = {
                s_idEmpresa: idEmpresa,
                s_idUsuario: usuarioLogin[0][0].IdUsuario
            }

            res.json({
                ok: true,
                message: '',
                data: usuarioLogin[0]
            });
        } else {
            res.json({
                ok: false,
                message: errorMessage,
                data: null
            });
        }
    });
});

usuario.get('/usuario/list/:idestado/:offset/:count', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Usuario_List(${s_idEmpresa},${req.params.idestado},${req.params.offset},${req.params.count})`;
    MySQL.ejecutarQuery(query, (err: any, usuario: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: '',
            data: usuario[0]
        });
    });
});

usuario.get('/usuario/get/:Id/:idMenu/:idAccion', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Usuario_Get(${s_idEmpresa}, ${req.params.Id})`;
    MySQL.ejecutarQuery(query, (err: any, empresaGet: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: '',
            data: empresaGet[0]
        });
    });
});

/*Falta agregar los permisos*/
usuario.post('/usuario/reg/:idMenu/:idAccion', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {idUsuario, apellidoPaterno, apellidoMaterno,
        nombres, usuario, idPerfil, idEstado} = req.body;
    const query = `CALL Usuario_InsertUpdate(${s_idEmpresa},${idUsuario},'${apellidoPaterno}','${apellidoMaterno}','${nombres}','${usuario}',
                                            ${idPerfil},${idEstado},${s_idUsuario},'HOSTWEB')`;
    MySQL.ejecutarQuery(query, (err: any, reg: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessaje = reg[0][0].ErrorMessage;
        if (!errorMessaje.includes('#')) {
            res.json({
                ok: true,
                message: errorMessaje,
                data: null
            });    
        } else {
            res.json({
                ok: false,
                message: errorMessaje,
                data: null
            });
        }
    });
});

usuario.get('/usuario/menu/', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Usuario_Menu_List(${s_idEmpresa}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, (err: any, usuarioMenu: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let newUsuarioMenu: any = [];                            
        usuarioMenu[0].forEach((item: any) => {
            if (item.CodMenu.length == 2) {
                newUsuarioMenu.push({
                    CodPadre: item.CodMenu,
                    IdTipo: item.IdTipo,
                    MenuPadre: item.Menu,
                    Css: item.Css,
                    //Action: item.Action,
                    Hijo: usuarioMenu[0].filter((x: any) => (x.IdTipo == 2 && x.CodMenu.slice(0, -2) == item.CodMenu))
                });
            }
        });

        res.json({
            ok: true,
            message: '',
            data: newUsuarioMenu
        });
    });
});

export default usuario;