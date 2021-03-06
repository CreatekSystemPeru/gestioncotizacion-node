import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteSucursal = Router();

clienteSucursal.get('/clientesucursal/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    let parms = [req.query.idEmpresa,req.query.idCliente || 0,req.query.idEstado || 0,s_idUsuario,req.query.start || 0,req.query.length || 0,search];
    const query = `CALL ClienteSucursal_List(?,?,?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteSucursal: any) => {
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
            recordsTotal: clienteSucursal[1][0].TotalFilas,
            recordsFiltered: clienteSucursal[1][0].TotalFiltrado,
            data: clienteSucursal[0],
            permiso: clienteSucursal[2]
        });
    });
});

clienteSucursal.get('/clientesucursal/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let parms = [req.query.idEmpresa,req.query.Id || 0];
    const query = `CALL ClienteSucursal_Get(?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteSucursalGet: any) => {
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
            data: clienteSucursalGet[0],
            dataDPTO: clienteSucursalGet[1],
            dataPROV: clienteSucursalGet[2],
            dataDIST: clienteSucursalGet[3]
        });
    });
});

clienteSucursal.post('/clientesucursal/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let {idEmpresa, idClienteSucursal, idCliente, sucursal, direccion, idUbigeo, telefono, correo, flagFiscal} = req.body;
    let parms = [idEmpresa,idClienteSucursal,idCliente,sucursal,direccion,idUbigeo,telefono,correo,flagFiscal,1,s_idUsuario];
    const query = `CALL ClienteSucursal_InsertUpdate(?,?,?,?,?,?,?,?,?,?,?)`;
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

clienteSucursal.get('/clientesucursal/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let parms = [req.query.idEmpresa,req.query.Id || 0,s_idUsuario];
    const query = `CALL ClienteSucursal_ActiveDeactive(?,?,?)`;
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

export default clienteSucursal;