import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const producto = Router();
producto.get('/producto/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    const query = `CALL Producto_List(${s_idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${search}')`;
    MySQL.ejecutarQuery(query, null, (err: any, producto: any) => {
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
            recordsTotal: producto[1][0].TotalFilas,
            recordsFiltered: producto[1][0].TotalFiltrado,
            data: producto[0],
            permiso: producto[2]
        });
    });
});

producto.get('/producto/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Producto_Get(${s_idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, productoGet: any) => {
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
            data: productoGet[0]
        });
    });
});

producto.post('/producto/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {idProducto, producto} = req.body;
    const query = `CALL Producto_InsertUpdate(${s_idEmpresa},${idProducto},'','${producto}',1)`;
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

producto.get('/producto/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Producto_ActiveDeactive(${s_idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, productoDelete: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: productoDelete[0][0].ErrorMessage,
            data: null
        });
    });
});

export default producto;