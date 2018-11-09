"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const empresa = express_1.Router();
empresa.get('/empresa/combo', (req, res) => {
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
empresa.get('/empresa/list', (req, res) => {
    const query = `CALL Empresa_List()`;
    mysql_1.default.ejecutarQuery(query, (err, empresa) => {
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
            data: empresa[0]
        });
    });
});
empresa.get('/empresa/get/:Id', (req, res) => {
    const query = `CALL Empresa_Get(${req.params.Id})`;
    mysql_1.default.ejecutarQuery(query, (err, empresaGet) => {
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
            data: empresaGet[0]
        });
    });
});
empresa.post('/empresa/reg', (req, res) => {
    let { idEmpresa, ruc, empresa, empresaAbrev, direccion, telefono1, telefono2, movil1, movil2, email, url } = req.body;
    const query = `CALL Empresa_InsertUpdate(${idEmpresa},'${ruc}','${empresa}','${empresaAbrev}','${direccion}','${telefono1}',
                                            '${telefono2}','${movil1}','${movil2}','${email}','${url}', 1, 1, 'Host')`;
    mysql_1.default.ejecutarQuery(query, (err, reg) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        let errorMessaje = reg[0][0].ErrorMessage;
        if (!errorMessaje.includes('#')) {
            res.json({
                ok: true,
                message: errorMessaje,
                data: null
            });
        }
        else {
            res.json({
                ok: false,
                message: errorMessaje,
                data: null
            });
        }
    });
});
exports.default = empresa;
