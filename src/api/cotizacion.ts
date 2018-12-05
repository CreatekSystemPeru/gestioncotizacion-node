import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const cotizacion = Router();
cotizacion.get('/cotizacion/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let search = (req.query.search) ? req.query.search.value : '';
    let params = [req.query.idEmpresa,req.query.idEstado || 0,s_idUsuario,req.query.start || 0,req.query.length || 0, search];
    const query = 'CALL CotizacionCab_List(?,?,?,?,?,?)';
    MySQL.ejecutarQuery(query, params, (err: any, cotizacion: any) => {
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
            recordsTotal: cotizacion[1][0].TotalFilas,
            recordsFiltered: cotizacion[1][0].TotalFiltrado,
            data: cotizacion[0],
            permiso: cotizacion[2]
        });
    });
});

cotizacion.get('/cotizacion/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let params = [req.query.idEmpresa, req.query.Id || 0];
    const query = 'CALL Cotizacion_Get(?,?)';   
    MySQL.ejecutarQuery(query, params, (err: any, cotizacionGet: any) => {
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
            data: cotizacionGet[0],
            dataDet: cotizacionGet[1]
        });
    });
});

// cotizacion.get('/cotizacion/a', (req: Request, res: Response) => {
//     let json = [{
//         a: 1,
//         b: 2
//     },{
//         a: 4,
//         b: 5
//     }];

//     let detalle: any = [];

//     json.forEach(element => {
//         detalle.push([
//             element.a,
//             element.b
//         ]);
//     });

//     console.log(detalle);

//     res.json({
//         ok: true,
//         message: ''
//     });
// });

cotizacion.post('/cotizacion/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let { idEmpresa, idCotizacionCab, idOrdenCompra, fechaCotizacion, idMoneda, detalleA, detalleB} = req.body;
    let detArrayA: any = [];
    detalleA.forEach((i: any) => {
        detArrayA.push([
            i.idCotizacionCliente,
            i.idClienteSucursal,
            i.idClienteContacto,
            i.idArea,
            i.flagEliminado
        ]);
    });
    let detArrayB: any = [];
    detalleB.forEach((i: any) => {
        detArrayB.push([
            i.idCotizacionDet,
            i.nroPosicion,
            i.idProducto,
            i.unidadMedida,
            i.cantidad,
            i.precioUnitario,
            i.total,
            i.flagEliminado
        ]);
    });
    const query1 = `CREATE TEMPORARY TABLE TempCotizacionCliente (
                        IdCotizacionCliente INT NOT NULL, IdClienteSucursal INT NOT NULL,
                        IdClienteContacto INT NOT NULL, IdArea INT NOT NULL, FlagEliminado TINYINT NOT NULL
                    );
                    INSERT INTO TempCotizacionCliente VALUES ?`;
    MySQL.ejecutarQuery(query1, detArrayA, (err: any, cotizacionGet: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        const query2 = `CREATE TEMPORARY TABLE TempCotizacionDet (
            IdCotizacionDet INT NOT NULL, NroPosicion VARCHAR(10) NOT NULL, IdProducto INT NOT NULL,
            UnidadMedida VARCHAR(10) NOT NULL, Cantidad INT NOT NULL, PrecioUnitario DECIMAL(18,2) NOT NULL,
            Total DECIMAL(18,2) NOT NULL, FlagEliminado TINYINT NOT NULL
        );
        INSERT INTO TempCotizacionDet VALUES ?`;
        MySQL.ejecutarQuery(query2, detArrayB, (err: any, cotizacionGet: any) => {
            if (err) {
                return res.json({
                    ok: false,
                    message: `#${err.message}`,
                    data: null
                });
            }

            let parms = [idEmpresa, idCotizacionCab, idOrdenCompra, fechaCotizacion, idMoneda, s_idUsuario]
            const query2 = 'CALL Cotizacion_InsertUpdate(?,?,?,?,?,?)';
            MySQL.ejecutarQuery(query2, parms, (err: any, reg: any) => {
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
    });
});

export default cotizacion;