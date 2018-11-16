import {Request, Response} from 'express';
import MySQL from '../mysql/mysql';

let verificaSesion = (req: Request, res: Response, next: any) => {
    if (!req.session!.userSesion) {
        return res.json({
            ok: false,
            message: `#Sesión Finalizada`,
            data: null
        });
    }

    next();
};

let verificaPermiso = (req: Request, res: Response, next: any) => {
    if (!req.session!.userSesion) {
        return res.json({
            ok: false,
            message: `#Sesión Finalizada`,
            data: null
        });
    }

    let reqArray = req.path.split('/');
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Usuario_Permission(${s_idEmpresa},${s_idUsuario},'${reqArray[1]}','${reqArray[2]}')`;
    MySQL.ejecutarQuery(query, (err: any, permiso: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        if (permiso[0][0].FlagAsignado == 0) {
            return res.json({
                ok: false,
                message: '#Acceso denegado',
                data: null
            });
        }

        next();
    });
}

export default { verificaSesion, verificaPermiso }