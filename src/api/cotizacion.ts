import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const cotizacion = Router();
cotizacion.get('/cotizacion/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    const query = `CALL CotizacionCab_List(${req.query.idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${search}')`;
    MySQL.ejecutarQuery(query, null, (err: any, cotizacion: any) => {
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
    const query = `CALL Cotizacion_Get(${req.query.idEmpresa}, ${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, cotizacionGet: any) => {
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

export default cotizacion;