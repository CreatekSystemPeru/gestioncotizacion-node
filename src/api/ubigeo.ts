import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const ubigeo = Router();

ubigeo.get('/ubigeo/departamento', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    const query = `CALL Ubigeo_Departamento()`;
    MySQL.ejecutarQuery(query, null, (err: any, ubigeoDep: any) => {
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
            data: ubigeoDep[0]
        });
    });
});

ubigeo.get('/ubigeo/provincia', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    
    const query = `CALL Ubigeo_Provincia('${req.query.idUbigeo || ''}')`;
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

ubigeo.get('/ubigeo/distrito', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    
    const query = `CALL Ubigeo_Distrito('${req.query.idUbigeo || ''}')`;
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

export default ubigeo;