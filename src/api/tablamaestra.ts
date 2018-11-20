import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const tablaMaestra = Router();

tablaMaestra.get('/tablamaestra/combo', [ permisos.verificaSesion ], (req: Request, res: Response) => {
    let {s_idEmpresa} = req.session!.userSesion;

    const query = `CALL TablaMaestra_Combo(${s_idEmpresa},${req.query.idTabla})`;
    MySQL.ejecutarQuery(query, (err: any, tablaGet: any) => {
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
            data: tablaGet[0]
        });
    });
});

export default tablaMaestra;