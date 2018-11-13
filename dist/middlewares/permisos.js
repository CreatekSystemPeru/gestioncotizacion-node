"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("../mysql/mysql"));
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
let verificaPermiso = (req, res, next) => {
    if (!req.session.userSesion) {
        return res.json({
            ok: false,
            message: `#Sesión Finalizada`,
            data: null
        });
    }
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    let idMenu = req.params.idMenu;
    let idAccion = req.params.idAccion;
    const query = `CALL Usuario_Menu_Permission(${s_idEmpresa},${s_idUsuario},${idMenu},${idAccion})`;
    mysql_1.default.ejecutarQuery(query, (err, permiso) => {
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
};
exports.default = { verificaSesion, verificaPermiso };
