"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const permisos_1 = __importDefault(require("../middlewares/permisos"));
const usuario = express_1.Router();
usuario.post('/login', (req, res) => {
    let { idEmpresa, usuario, clave } = req.body;
    const query = `CALL Usuario_Autentication(${idEmpresa}, '${usuario}', '${clave}')`;
    mysql_1.default.ejecutarQuery(query, (err, usuarioLogin) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        let errorMessage = usuarioLogin[0][0].ErrorMessage;
        if (errorMessage == '') {
            req.session.userSesion = {
                s_idEmpresa: idEmpresa,
                s_idUsuario: usuarioLogin[0][0].IdUsuario
            };
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
usuario.get('/usuario/list/:idestado/:offset/:count', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa } = req.session.userSesion;
    const query = `CALL Usuario_List(${s_idEmpresa},${req.params.idestado},${req.params.offset},${req.params.count})`;
    mysql_1.default.ejecutarQuery(query, (err, usuario) => {
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
            data: usuario[0]
        });
    });
});
usuario.get('/usuario/get/:Id', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa } = req.session.usuarioSesion;
    const query = `CALL Usuario_Get(${s_idEmpresa}, ${req.params.Id})`;
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
/*Falta agregar los permisos*/
usuario.post('/usuario/reg', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    let { idUsuario, apellidoPaterno, apellidoMaterno, nombres, usuario, idPerfil, idEstado } = req.body;
    const query = `CALL Usuario_InsertUpdate(${s_idEmpresa},${idUsuario},'${apellidoPaterno}','${apellidoMaterno}','${nombres}','${usuario}',
                                            ${idPerfil},${idEstado},${s_idUsuario},'HOSTWEB')`;
    mysql_1.default.ejecutarQuery(query, (err, reg) => {
        if (err) {
            return res.json({
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
usuario.get('/usuario/menu/', [permisos_1.default.verificaSesion], (req, res) => {
    let { s_idEmpresa, s_idUsuario } = req.session.userSesion;
    const query = `CALL Usuario_Menu_List(${s_idEmpresa}, ${s_idUsuario})`;
    mysql_1.default.ejecutarQuery(query, (err, usuarioMenu) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }
        let newUsuarioMenu = [];
        usuarioMenu[0].forEach((item) => {
            if (item.CodMenu.length == 2) {
                newUsuarioMenu.push({
                    CodPadre: item.CodMenu,
                    IdTipo: item.IdTipo,
                    MenuPadre: item.Menu,
                    Css: item.Css,
                    //Action: item.Action,
                    Hijo: usuarioMenu[0].filter((x) => (x.IdTipo == 2 && x.CodMenu.slice(0, -2) == item.CodMenu))
                });
            }
        });
        res.json({
            ok: true,
            message: '',
            data: newUsuarioMenu
        });
    });
});
exports.default = usuario;
