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

// let verificaPermiso = (req: Request, res: Response, next: any) => {
//     if (!req.session!.userSesion) {
//         return res.json({
//             ok: false,
//             message: `#Sesión Finalizada`,
//             data: null
//         });
//     }

//     let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;
//     let idMenu = req.params.idMenu;
//     let idTipo = req.params.idTipo;

//     const query = `CALL Usuario_Menu_Permission(${s_idEmpresa},${s_idUsuario},${idMenu})`;
//     MySQL.ejecutarQuery(query, (err: any, permiso: any) => {
//         if (err) {
//             return res.json({
//                 ok: false,
//                 message: `#${err.message}`,
//                 data: null
//             });
//         }

//         if (permiso[0]) {
//             if (condition) {
                
//             }
//         }

//         res.json({
//             ok: true,
//             message: '',
//             data: usuario[0]
//         });
//     });
// }

export default { verificaSesion }