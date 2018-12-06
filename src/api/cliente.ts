import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const cliente = Router();
cliente.get('/cliente/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    let parms = [req.query.idEmpresa,req.query.idEstado || 0,s_idUsuario,req.query.start || 0,req.query.length || 0,search];
    const query = `CALL Cliente_List(?,?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, cliente: any) => {
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
            draw: req.query.draw,
            recordsTotal: cliente[1][0].TotalFilas,
            recordsFiltered: cliente[1][0].TotalFiltrado,
            data: cliente[0],
            permiso: cliente[2]
        });
    });
});

cliente.get('/cliente/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let parms = [req.query.idEmpresa,req.query.Id || 0];
    const query = `CALL Cliente_Get(?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteGet: any) => {
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

cliente.post('/cliente/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let {idEmpresa, idCliente, RUC, razonSocial, idGiro} = req.body;
    let parms = [idEmpresa,idCliente,RUC,razonSocial,idGiro,1,s_idUsuario];
    const query = `CALL Cliente_InsertUpdate(?,?,?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, reg: any) => {
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

cliente.get('/cliente/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let parms = [req.query.idEmpresa,req.query.Id || 0,s_idUsuario];
    const query = `CALL Cliente_ActiveDeactive(?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteDelete: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: clienteDelete[0][0].ErrorMessage,
            data: null
        });
    });
});

export default cliente;