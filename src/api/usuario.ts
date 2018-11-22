import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const usuario = Router();
usuario.post('/usuario/login', (req: Request, res: Response) => {
    let { usuario, clave } = req.body;

    const query = `CALL Usuario_Autentication('${ usuario }', '${ clave }')`;
    MySQL.ejecutarQuery(query, null, (err: any, usuarioLogin: any) => {
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
                s_idEmpresa: usuarioLogin[0][0].IdEmpresa,
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

usuario.get('/usuario/list', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    
    const query = `CALL Usuario_List(${s_idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.offset || 0},${req.query.count || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, usuario: any) => {
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
            data: usuario[0],
            permiso: usuario[1]
        });
    });
});

usuario.get('/usuario/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Usuario_Get(${s_idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, empresaGet: any) => {
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
usuario.post('/usuario/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {idUsuario, apellidoPaterno, apellidoMaterno,
        nombres, usuario, idPerfil} = req.body;
    const query = `CALL Usuario_InsertUpdate(${s_idEmpresa},${idUsuario},'${apellidoPaterno}','${apellidoMaterno}','${nombres}','${usuario}',
                                            ${idPerfil},1,${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, reg: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessage = reg[0][0].ErrorMessage;
        if (!errorMessage.includes('#')) {
            return res.json({
                ok: true,
                message: errorMessage,
                data: null
            });    
        }
        
        res.json({
            ok: false,
            message: errorMessage,
            data: null
        });
    });
});

usuario.get('/usuario/menu/', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Usuario_Menu_List(${s_idEmpresa}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, usuarioMenu: any) => {
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

usuario.get('/usuario/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Usuario_ActiveDeactive(${s_idEmpresa}, ${req.query.Id || 0}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, usuarioDelete: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: usuarioDelete[0][0].ErrorMessage,
            data: null
        });
    });
});

usuario.get('/usuario/salir', (req: Request, res: Response) => {
    req.session!.destroy((err) =>{
        res.json({
            ok: (err) ? false : true,
            message: (err) ? `#${err.message}` : 'Se ha cerrado la sesión',
            data: null
        });
    });
});

export default usuario;