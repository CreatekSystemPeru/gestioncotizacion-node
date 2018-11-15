"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const permisos_1 = __importDefault(require("../middlewares/permisos"));
const empresa = express_1.Router();
empresa.get('/api/empresa/combo', (req, res) => {
    const query = `CALL Empresa_Combo()`;
    mysql_1.default.ejecutarQuery(query, (err, empresaCombo) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        res.json({
            ok: true,
            message: '',
            data: empresaCombo[0]
        });
    });
});
empresa.get('/api/empresa/list/:idEstado/:offset/:count', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Empresa_List(${s_idEmpresa},${req.params.idEstado},${s_idUsuario},${req.params.offset},${req.params.count})`;
    mysql_1.default.ejecutarQuery(query, (err, empresa) => {
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
            data: empresa[0],
            permiso: empresa[1]
        });
    });
});
empresa.get('/api/empresa/get/:Id', [permisos_1.default.verificaSesion], (req, res) => {
    const query = `CALL Empresa_Get(${req.params.Id})`;
    mysql_1.default.ejecutarQuery(query, (err, empresaGet) => {
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
            data: empresaGet[0]
        });
    });
});
empresa.post('/api/empresa/reg/', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idUsuario } = req.session.userSesion;
    let { idEmpresa, ruc, empresa, empresaAbrev, direccion, telefono1, telefono2, movil1, movil2, email, url } = req.body;
    const query = `CALL Empresa_InsertUpdate(${idEmpresa},'${ruc}','${empresa}','${empresaAbrev}','${direccion}','${telefono1}',
                                            '${telefono2}','${movil1}','${movil2}','${email}','${url}',1,${s_idUsuario})`;
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
empresa.get('/api/empresa/delete/:Id', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idUsuario } = req.session.userSesion;
    const query = `CALL Cliente_ActiveDeactive(${req.params.Id}, ${s_idUsuario})`;
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
            message: clienteGet[0][0].ErrorMessage,
            data: null
        });
    });
});
empresa.get('/api/empresa/delete/:Id', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Empresa_ActiveDeactive(${s_idEmpresa}, ${req.params.Id}, ${s_idUsuario})`;
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
            message: clienteGet[0][0].ErrorMessage,
            data: null
        });
    });
});
exports.default = empresa;
