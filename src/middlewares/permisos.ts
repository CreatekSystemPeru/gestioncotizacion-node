import {Router, Request, Response} from 'express';
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

    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;
    let idMenu = req.params.idMenu;
    let idAccion = req.params.idAccion;

    const query = `CALL Usuario_Menu_Permission(${s_idEmpresa},${s_idUsuario},${idMenu},${idAccion})`;
    MySQL.ejecutarQuery(query, (err: any, permiso: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        console.log(permiso[0][0]);
        if (permiso[0][0].Flag == 0) {
            return res.json({
                ok: false,
                message: '#Sin permiso para ejecutar esta acción',
                data: null
            });
        }

        next();
    });
}

export default { verificaSesion, verificaPermiso }