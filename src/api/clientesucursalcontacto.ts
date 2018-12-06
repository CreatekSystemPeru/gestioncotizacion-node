import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteSucursalContacto = Router();

clienteSucursalContacto.get('/clientesucursalcontacto/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    
    let search = (req.query.search) ? req.query.search.value : '';
    let parms = [req.query.idEmpresa,req.query.idClienteSucursal,s_idUsuario,req.query.start || 0,req.query.length || 0,search];
    const query = `CALL ClienteSucursalContacto_List(?,?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteSucursalContacto: any) => {
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
            recordsTotal: clienteSucursalContacto[1][0].TotalFilas,
            recordsFiltered: clienteSucursalContacto[1][0].TotalFiltrado,
            data: clienteSucursalContacto[0],
            permiso: clienteSucursalContacto[2]
        });
    });
});

clienteSucursalContacto.get('/clientesucursalcontacto/asignar', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let parms = [req.query.idEmpresa,req.query.idClienteSucursal,req.query.idClienteContacto,s_idUsuario];
    const query = `CALL ClienteSucursalContacto_Asignar(?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteSucursalContactoAsignar: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: clienteSucursalContactoAsignar[0][0].ErrorMessage,
            data: null
        });
    });
});

clienteSucursalContacto.get('/clientesucursalcontacto/remove', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let parms = [req.query.idEmpresa,req.query.idClienteSucursal,req.query.idClienteContacto,s_idUsuario];
    const query = `CALL ClienteSucursalContacto_Delete(?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteSucursalContactoDelete: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: clienteSucursalContactoDelete[0][0].ErrorMessage,
            data: null
        });
    });
});

export default clienteSucursalContacto;