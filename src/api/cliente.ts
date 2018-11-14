import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const cliente = Router();
cliente.get('/api/cliente/list/:idMenu/:idEstado/:offset/:count', [permisos.verificaSesion], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;
    req.session!.idMenu = req.params.idMenu;

    const query = `CALL Cliente_List(${s_idEmpresa},${req.params.idEstado},${req.params.offset},${req.params.count})`;
    MySQL.ejecutarQuery(query, (err: any, cliente: any) => {
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
            data: cliente[0]
        });
    });
});

cliente.get('/api/cliente/get/:Id/:idAccion', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Cliente_Get(${s_idEmpresa}, ${req.params.Id})`;
    MySQL.ejecutarQuery(query, (err: any, clienteGet: any) => {
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
            data: clienteGet[0]
        });
    });
});

cliente.post('/api/cliente/reg/:idAccion', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {idCliente, RUC, razonSocial, idGiro} = req.body;
    const query = `CALL Cliente_InsertUpdate(${s_idEmpresa},${idCliente},'${RUC}','${razonSocial}',${idGiro},
                                            1,${s_idUsuario},'HOSTWEB')`;
    MySQL.ejecutarQuery(query, (err: any, reg: any) => {
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

cliente.get('/cliente/delete/:Id/:idAccion', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Cliente_ActiveDeactive(${s_idEmpresa}, ${req.params.Id}, ${s_idUsuario}, 'HOSTWEB')`;
    MySQL.ejecutarQuery(query, (err: any, clienteGet: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: clienteGet[0][0].ErrorMessage,
            data: null
        });
    });
});

export default cliente;