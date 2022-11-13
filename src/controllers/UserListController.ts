import { Request, Response } from "express";
import { Release } from "../models/Release";
import { User } from "../models/User";
import { UserList } from "../models/UserList";

export class UserListController
{

    static async addItemToList(req: Request, res: Response){
        //recupera o id do release
        const { releaseid } = req.params;
        if(!releaseid){
            return res.status(422).json({ message: "Erro ao encontrar lançamento" });
        }

        //verifica se o release existe
        const release: any = await Release.findOne({ where: { "id": releaseid } });
        if(!release){
            return res.status(422).json({ message: "Erro ao encontrar lançamento" });
        }

        //verifica se o id do usuário pertence a um usuário real
        const user = await User.findOne({ where: { "id": req.user.id } });
        if(!user){
            return res.status(422).json({ message: "Usuário não encontrado" });
        }

        //verifica se release já está na sua lista
        const listExists = await UserList.findOne({ where: { "userId": req.user.id, "name": release.name } });
        if(listExists){
            return res.status(422).json({ message: "Este lançamento já está na sua lista" });
        }      

        //cria a lista
        await UserList.create({
            name: release.name, image: release.image, date: release.date, userId: req.user.id
        })
        .then(response => {
            return res.status(201).json({ message: "Lançamento adicionado à sua lista com sucesso" });
        })
        .catch(err => {
            return res.status(422).json({ message: "Erro ao adicionar lançamento à sua lista" });
        })
    }

    static async getList(req: Request, res: Response){
        const list = await UserList.findAll({ where: { "userId": req.user.id } });
        res.status(200).json(list);
    }

    static async removeFromList(req: Request, res: Response){
        const { id } = req.params;

        //verifica se item existe
        const listExists = await UserList.findOne({ where: { "id": id, "userId": req.user.id } })
        if(!listExists){
            return res.status(422).json({ message: "Erro ao remover item" });
        }

        await UserList.destroy({ where: { "id": id, "userId": req.user.id }})
        .then(response => {
            res.status(200).json({ message: "Item removido da lista" });
        })
        .catch(err => {
            res.status(422).json({ message: "Erro ao remover item da lista" })
        })
    }
}