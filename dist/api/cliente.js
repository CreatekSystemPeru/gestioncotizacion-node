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
    const query = `CALL Cliente_List(${s_idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${req.query.search.value || ''}')`;
    mysql_1.default.ejecutarQuery(query, null, (err, cliente) => {
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
            recordsTotal: cliente[1][0].TotalFilas,
            recordsFiltered: cliente[1][0].TotalFiltrado,
            data: cliente[0],
            permiso: cliente[2]
        });
    });
});
cliente.get('/cliente/get/', [permisos_1.default.verificaSesion, permisos_1.default.verificaPermiso], (req, res) => {
    let { s_idEmpresa } = req.session.userSesion;
    const query = `CALL Cliente_Get(${s_idEmpresa}, ${req.query.Id || 0})`;
    mysql_1.default.ejecutarQuery(query, null, (err, clienteGet) => {
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
    const query = `CALL Cliente_InsertUpdate(${s_idEmpresa},${idCliente},'${RUC}','${razonSocial}',${idGiro},1)`;
    mysql_1.default.ejecutarQuery(query, null, (err, reg) => {
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
    const query = `CALL Cliente_ActiveDeactive(${s_idEmpresa}, ${req.query.Id || 0})`;
    mysql_1.default.ejecutarQuery(query, null, (err, clienteDelete) => {
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
