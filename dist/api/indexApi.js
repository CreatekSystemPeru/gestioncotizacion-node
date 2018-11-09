"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_1 = __importDefault(require("./empresa"));
const usuario_1 = __importDefault(require("./usuario"));
const index = express_1.Router();
index.use(empresa_1.default);
index.use(usuario_1.default);
exports.default = index;
