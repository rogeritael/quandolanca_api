"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirmpassword } = req.body;
            //todos os campos foram preenchidos?
            if (!name || !email || !password || !confirmpassword) {
                return res.status(422).json({ message: "Todos os campos são obrigatórios" });
            }
            //a senha e a confirmação são iguais?
            if (password !== confirmpassword) {
                return res.status(422).json({ message: "As senhas não coincidem" });
            }
            //o usuário já existe no banco?
            const userExists = yield User_1.User.findAll({ where: { "email": email } });
            if (userExists) {
                return res.status(422).json({ message: "Este endereço de e-mail já foi cadastrado" });
            }
            //criptografa a senha
            const salt = yield bcrypt_1.default.genSalt(12);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            //cria o usuário
            const user = yield User_1.User.create({
                name, email, password: hashedPassword
            })
                .then((() => res.status(201).json({ message: "Cadastro realizado com sucesso!" })))
                .catch((err) => res.status(201).json({ message: "Erro ao cadastrar usuário", err }));
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //os campos foram preenchidos?
            if (!email || !password) {
                return res.status(422).json({ message: "Todos os campos são obrigatórios" });
            }
            //o email existe no banco de dados?
            const user = yield User_1.User.findOne({ where: { "email": email } });
            if (!user) {
                return res.status(422).json({ message: "Usuário não encontrado" });
            }
            //a senha coincide com a registrada no banco de dados?
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
            console.log(isPasswordCorrect);
            if (!isPasswordCorrect) {
                return res.status(422).json({ message: "Por favor, verifique se os dados foram preenchidos corretamente" });
            }
            //gera o token
            try {
                const token = yield jsonwebtoken_1.default.sign({
                    id: user.id
                }, 'jfn30tk5#4f$');
                res.status(200).json({ message: "Login efetuado com sucesso", token });
            }
            catch (err) {
                res.status(422).json({ message: "Erro ao fazer login" });
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            res.status(200).json({ message: "funcionou", userId });
        });
    }
}
exports.UserController = UserController;
