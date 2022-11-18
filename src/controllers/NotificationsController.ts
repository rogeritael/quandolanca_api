import { Request, Response } from "express";
import { Notifications } from "../models/Notifications";
import { User } from "../models/User";
import { UserList } from "../models/UserList";

export class NotificationsController
{

    static async createNotification(req: Request, res: Response){
        const {type, days, id} = req.body;

        if(!type || !days || !id)
            return res.status(422).json({ message: "Todos os campos são obrigatórios" })


        const release: any = await UserList.findOne({ where: { 'id': id } });
        if(!release)
            return res.status(422).json({ message: "Erro ao encontrar lançamento" });

        
        if(type === 'comingsoon'){
            let customMessage = `${release.name} está programado para lançar daqui à ${days} dias.`;
                
            //verifica se já existe uma notificação igual a esta
            const notificationAlreadyExists = await Notifications.findOne({ where: { "type": "Em Breve", "description": customMessage } });
            if(notificationAlreadyExists){
                return res.status(422).json({message: "Esta notificação já foi criada"});
            }

            await Notifications.create({
                type: 'Em Breve', description: customMessage, userId: req.user.id
            })
            .then(response => res.status(201).json({ message: "Notificação criada com sucesso" }))
            .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }));


        } else if(type === 'released'){
            let customMessage = ''
            if(days === 0){
                customMessage = `${release.name} acaba de ser lançado`;
            }else {
                customMessage = `${release.name} foi lançado à ${days} dias`;
            }

            //verifica se já existe uma notificação igual a esta
            const notificationAlreadyExists = await Notifications.findOne({ where: { "type": "Lançou", "description": customMessage } });
            if(notificationAlreadyExists){
                return res.status(422).json({message: "Esta notificação já foi criada"});
            }

            await Notifications.create({
                type: 'Lançou', description: customMessage, userId: req.user.id
            })
            .then(response => res.status(201).json({ message: "Notificação criada com sucesso" }))
            .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }));
        }

    }

    // static async generateNotifications(req: Request, res: Response){
    //     const user = await User.findOne({ where: { id: req.user.id } });

    //     user.
    // }
}