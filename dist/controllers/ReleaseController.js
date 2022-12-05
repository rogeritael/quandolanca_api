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
exports.ReleaseController = void 0;
const moment_1 = __importDefault(require("moment"));
const { Op } = require("sequelize");
const Release_1 = require("../models/Release");
const fs_1 = __importDefault(require("fs"));
class ReleaseController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, date, category } = req.body;
            //verifica se os campos foram preenchidos
            if (!name || !category || !date) {
                return res.status(422).json({ message: "Todos os campos são obrigatórios" });
            }
            //verifica se o release já existe
            const releaseAlreadyExists = yield Release_1.Release.findOne({ where: { "name": name } });
            if (releaseAlreadyExists) {
                return res.status(422).json({ message: "Este lançamento já foi cadastrado" });
            }
            //verifica se chegou alguma imagem
            // let image = ''
            // if(req.file){
            //     image = req.file.filename
            // }
            const file = fs_1.default.readFileSync(`${req.file.path}`);
            const base64image = Buffer.from(file).toString("base64");
            // console.log(base64image)
            //cria o lançamento
            yield Release_1.Release.create({
                name, image: base64image, date, category
            })
                .then(response => {
                res.status(201).json({ message: "Lançamento adicionado com sucesso" });
            })
                .catch(err => {
                res.status(422).json({ message: "Erro ao adicionar lançamento", err });
            });
        });
    }
    static getReleaseByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category } = req.params;
            //recupera os lançamentos pela categoria
            try {
                const releases = yield Release_1.Release.findAll({ where: { "category": category } });
                res.status(200).json(releases);
            }
            catch (err) {
                res.status(422).json({ message: "Erro ao recuperar lançamentos" });
            }
        });
    }
    //recupera lançamentos próximos de serem lançados
    static getNextReleases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //recupera a data atual e os próximos 30 dias
            const currentDate = new Date();
            const next30days = (0, moment_1.default)().add(30, 'day');
            //recupera o que vai ser lançado de hoje até um mês a frente
            const nextReleases = yield Release_1.Release.findAll({ where: { date: { [Op.gte]: currentDate, [Op.lte]: next30days } } });
            res.status(200).json(nextReleases);
        });
    }
    //recupera tudo o que foi lançado nos últimos 30 dias
    static getRecentlyReleased(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //recupera a data atual e os últimos 30 dias
            const currentDate = new Date();
            const last30days = (0, moment_1.default)().subtract(30, 'day');
            //recupera o que foi lançado em até 30 dias
            const recentlyReleased = yield Release_1.Release.findAll({ where: { date: { [Op.gte]: last30days, [Op.lte]: currentDate } } });
            // res.status(200).json(nearlyReleases);
            res.status(200).json(recentlyReleased);
        });
    }
    static searchReleaseByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { term } = req.params;
            if (!term || term.length === 0) {
                return res.status(422).json({ message: "Não foi possível encontrar o lançamento" });
            }
            yield Release_1.Release.findAll({ where: { name: { [Op.like]: `%${term}%` } } })
                .then(response => res.status(200).json(response))
                .catch(err => res.status(422).json({ message: "Erro ao encontrar lançamento" }));
        });
    }
}
exports.ReleaseController = ReleaseController;
