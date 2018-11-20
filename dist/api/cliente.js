"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const permisos_1 = __importDefault(require("../middlewares/permisos"));
const cliente = express_1.Router();
cliente.get('/cliente/list/', [permisos_1.default.verificaSesion, permisos_1.default.verificaPermiso], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Cliente_List(${s_idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.offset || 0},${req.query.count || 0})`;
    mysql_1.default.ejecutarQuery(query, (err, cliente) => {
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
            data: cliente[0],
            permiso: cliente[1]
        });
    });
});
cliente.get('/cliente/get/', [permisos_1.default.verificaSesion, permisos_1.default.verificaPermiso], (req, res) => {
    let { s_idEmpresa } = req.session.userSesion;
    const query = `CALL Cliente_Get(${s_idEmpresa}, ${req.query.Id || 0})`;
    mysql_1.default.ejecutarQuery(query, (err, clienteGet) => {
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
            data: clienteGet[0]
        });
    });
});
cliente.post('/cliente/reg', [permisos_1.default.verificaSesion, permisos_1.default.verificaPermiso], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    let { idCliente, RUC, razonSocial, idGiro } = req.body;
    const query = `CALL Cliente_InsertUpdate(${s_idEmpresa},${idCliente},'${RUC}','${razonSocial}',${idGiro},
                                            1,${s_idUsuario})`;
    mysql_1.default.ejecutarQuery(query, (err, reg) => {
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
cliente.get('/cliente/delete', [permisos_1.default.verificaSesion, permisos_1.default.verificaPermiso], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Cliente_ActiveDeactive(${s_idEmpresa}, ${req.query.Id || 0}, ${s_idUsuario})`;
    mysql_1.default.ejecutarQuery(query, (err, clienteDelete) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        res.json({
            ok: true,
            message: clienteDelete[0][0].ErrorMessage,
            data: null
        });
    });
});
exports.default = cliente;
