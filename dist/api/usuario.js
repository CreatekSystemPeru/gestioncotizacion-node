"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const usuario = express_1.Router();
usuario.post('/login', (req, res) => {
    let { idEmpresa, usuario, clave } = req.body;
    const query = `CALL Usuario_Autentication(${idEmpresa}, '${usuario}', '${clave}')`;
    mysql_1.default.ejecutarQuery(query, (err, usuarioLogin) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        let errorMessage = usuarioLogin[0][0].ErrorMessage;
        if (errorMessage == '') {
            res.json({
                ok: true,
                message: '',
                data: usuarioLogin[0]
            });
        }
        else {
            res.json({
                ok: false,
                message: errorMessage,
                data: null
            });
        }
    });
});
usuario.get('/usuario/list', (req, res) => {
    const query = `CALL `;
    mysql_1.default.ejecutarQuery(query, (err, usuario) => {
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
            data: usuario[0]
        });
    });
});
usuario.post('/usuario/get/', (req, res) => {
    let { idEmpresa, idUsuario } = req.body;
    const query = `CALL `;
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
usuario.post('/usuario/reg', (req, res) => {
    let { idUsuario, apellidoPaterno, apellidoMaterno, nombres, usuario, clave, idPerfil, permisos } = req.body;
    const query = `CALL Usuario_InsertUpdate(${idUsuario},'${apellidoPaterno}','${apellidoMaterno}','${nombres}','${usuario}',
                                            '${clave}','${idPerfil}',1,1,'Host')`;
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
exports.default = usuario;
