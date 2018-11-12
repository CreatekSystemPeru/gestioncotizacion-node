import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const usuario = Router();
usuario.post('/login', (req: Request, res: Response) => {
    let { idEmpresa, usuario, clave } = req.body;

    const query = `CALL Usuario_Autentication(${ idEmpresa}, '${ usuario }', '${ clave }')`;
    MySQL.ejecutarQuery(query, (err: any, usuarioLogin: any) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessage = usuarioLogin[0][0].ErrorMessage;
        if (errorMessage == '') {
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

usuario.get('/usuario/list', (req: Request, res: Response) => {
    const query = `CALL `;
    MySQL.ejecutarQuery(query, (err: any, usuario: any) => {
        if (err) {
            res.json({
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

usuario.get('/usuario/get/:Id', (req: Request, res: Response) => {
    //req.params.Id
    const query = `CALL `;
    MySQL.ejecutarQuery(query, (err: any, empresaGet: any) => {
        if (err) {
            res.json({
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

usuario.post('/usuario/reg', (req: Request, res: Response) => {
    let { idUsuario, apellidoPaterno, apellidoMaterno,
        nombres, usuario, clave, idPerfil, permisos} = req.body;
    const query = `CALL Usuario_InsertUpdate(${idUsuario},'${apellidoPaterno}','${apellidoMaterno}','${nombres}','${usuario}',
                                            '${clave}','${idPerfil}',1,1,'Host')`;
    MySQL.ejecutarQuery(query, (err: any, reg: any) => {
        if (err) {
            res.json({
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

export default usuario;