"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    //verifica se foi passado algum token
    if (!req.headers.authorization) {
        return res.status(422).json({ message: "Acesso negado" });
    }
    //verifica se o token é válido
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(req.headers.authorization, "jfn30tk5#4f$");
        req.user = {
            id: verifiedToken.id
        };
        next();
    }
    catch (err) {
        res.status(422).json({ message: "Token inválido" });
    }
    //retorna o usuário
};
exports.verifyToken = verifyToken;
