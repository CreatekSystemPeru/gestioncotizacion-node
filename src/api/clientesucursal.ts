import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteSucursal = Router();

clienteSucursal.get('/clientesucursal/list/', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    const query = `CALL ClienteSucursal_List(${s_idEmpresa}, ${req.query.idCliente || 0}, ${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${search}')`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteSucursal: any) => {
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
            data: clienteSucursal[0]//,
            //permiso: clienteSucursal[2]
        });
    });
});

clienteSucursal.get('/clientesucursal/get/', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL ClienteSucursal_Get(${s_idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteGet: any) => {
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

clienteSucursal.post('/clientesucursal/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {idCliente, RUC, razonSocial, idGiro} = req.body;
    const query = `CALL ClienteSucursal_InsertUpdate(${s_idEmpresa},${idCliente},'${RUC}','${razonSocial}',${idGiro}, 1)`;
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

clienteSucursal.get('/clientesucursal/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL ClienteSucursal_ActiveDeactive(${s_idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteDelete: any) => {
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