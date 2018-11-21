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
    let reqArray = req.path.split('/');
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Usuario_Permission(${s_idEmpresa},${s_idUsuario},'${reqArray[1]}','${reqArray[2]}')`;
    mysql_1.default.ejecutarQuery(query, null, (err, permiso) => {
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
};
exports.default = { verificaSesion, verificaPermiso };
