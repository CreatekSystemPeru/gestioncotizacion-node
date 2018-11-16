import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const producto = Router();
producto.get('/producto/list/:idEstado/:offset/:count', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Producto_List(${s_idEmpresa},${req.params.idEstado},${s_idUsuario},${req.params.offset},${req.params.count})`;
    MySQL.ejecutarQuery(query, (err: any, producto: any) => {
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
            data: producto[0],
            permiso: producto[1]
        });
    });
});

producto.get('/producto/get/:Id', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL Producto_Get(${s_idEmpresa}, ${req.params.Id})`;
    MySQL.ejecutarQuery(query, (err: any, productoGet: any) => {
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
    const query = `CALL Producto_InsertUpdate(${s_idEmpresa},${idProducto},'','${producto}',1,${s_idUsuario})`;
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

producto.get('/producto/delete/:Id', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Producto_ActiveDeactive(${s_idEmpresa}, ${req.params.Id}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, (err: any, productoDelete: any) => {
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