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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListController = void 0;
const Release_1 = require("../models/Release");
const User_1 = require("../models/User");
const UserList_1 = require("../models/UserList");
class UserListController {
    static addItemToList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //recupera o id do release
            const { releaseid } = req.params;
            if (!releaseid) {
                return res.status(422).json({ message: "Erro ao encontrar lançamento" });
            }
            //verifica se o release existe
            const release = yield Release_1.Release.findOne({ where: { "id": releaseid } });
            if (!release) {
                return res.status(422).json({ message: "Erro ao encontrar lançamento" });
            }
            //verifica se o id do usuário pertence a um usuário real
            const user = yield User_1.User.findOne({ where: { "id": req.user.id } });
            if (!user) {
                return res.status(422).json({ message: "Usuário não encontrado" });
            }
            //verifica se release já está na sua lista
            const listExists = yield UserList_1.UserList.findOne({ where: { "userId": req.user.id, "name": release.name } });
            if (listExists) {
                return res.status(422).json({ message: "Este lançamento já está na sua lista" });
            }
            //cria a lista
            try {
                yield UserList_1.UserList.create({ name: release.name, image: release.image, date: release.date, userId: req.user.id });
                const updatedList = yield UserList_1.UserList.findAll({ where: { "userId": req.user.id } });
                return res.status(201).json({ message: "Lançamento adicionado à sua lista com sucesso", updatedList });
            }
            catch (err) {
                return res.status(422).json({ message: "Erro ao adicionar lançamento à sua lista" });
            }
        });
    }
    static getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield UserList_1.UserList.findAll({ where: { "userId": req.user.id } });
            res.status(200).json(list);
        });
    }
    static removeFromList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //verifica se item existe
            const listExists = yield UserList_1.UserList.findOne({ where: { "id": id, "userId": req.user.id } });
            if (!listExists) {
                return res.status(422).json({ message: "Erro ao remover item" });
            }
            yield UserList_1.UserList.destroy({ where: { "id": id, "userId": req.user.id } })
                .then(response => {
                res.status(200).json({ message: "Item removido da lista" });
            })
                .catch(err => {
                res.status(422).json({ message: "Erro ao remover item da lista" });
            });
        });
    }
}
exports.UserListController = UserListController;
