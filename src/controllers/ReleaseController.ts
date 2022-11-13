import { Request, response, Response } from "express";
import moment from "moment";
const { Op } = require("sequelize");
import { Release } from "../models/Release";

export class ReleaseController
{
    static async create(req: Request, res: Response){
        const { name, image, date, category } = req.body;
        
        //verifica se os campos foram preenchidos
        if(!name || !image! || !date){
            return res.status(422).json({ message: "Todos os campos são obrigatórios" });
        }

        //verifica se o release já existe
        const releaseAlreadyExists = await Release.findOne({ where: { "name": name } });
        if(releaseAlreadyExists){
            return res.status(422).json({ message: "Este lançamento já foi cadastrado" });
        }

        //cria o lançamento
        await Release.create({
            name, image, date, category
        })
        .then( response => {
            res.status(201).json({ message: "Lançamento adicionado com sucesso" });
        })
        .catch(err => {
            res.status(422).json({ message: "Erro ao adicionar lançamento" });
        });
    }

    static async getReleaseByCategory(req: Request, res: Response){
        const { category } = req.params;

        //recupera os lançamentos pela categoria
        try {
            const releases = await Release.findAll({ where: { "category": category } });
            res.status(200).json(releases);
        }catch(err){
            res.status(422).json({ message: "Erro ao recuperar lançamentos" });
        }
    }

    //recupera lançamentos próximos de serem lançados
    static async getNextReleases(req: Request, res: Response){
        //recupera a data atual e os próximos 30 dias
        const currentDate = new Date();
        const next30days = moment().add(30, 'day');

        //recupera o que vai ser lançado de hoje até um mês a frente
        const nextReleases = await Release.findAll({ where: { date: { [Op.gte]: currentDate, [Op.lte]: next30days } } });

        res.status(200).json(nextReleases);
    }

    //recupera tudo o que foi lançado nos últimos 30 dias
    static async getRecentlyReleased(req: Request, res: Response){
        //recupera a data atual e os últimos 30 dias
        const currentDate = new Date();
        const last30days = moment().subtract(30, 'day');

        //recupera o que foi lançado em até 30 dias
        const recentlyReleased = await Release.findAll({ where: { date: { [Op.gte]: last30days, [Op.lte]: currentDate } } });

        // res.status(200).json(nearlyReleases);
        res.status(200).json(recentlyReleased);
    }
}