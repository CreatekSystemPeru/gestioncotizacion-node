"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let verificaSesion = (req, res, next) => {
    if (!req.session.userSesion) {
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
exports.default = { verificaSesion };
