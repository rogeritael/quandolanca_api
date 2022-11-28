import { Request, Response } from "express";
import { Notifications } from "../models/Notifications";

export class NotificationsController
{

    static async getNotifications(req: Request, res: Response){
        try{
            const notifications = await Notifications.findAll({ 
                where: { "userId": req.user.id },
                order: [['createdAt', 'ASC']]
            });
            res.status(200).json(notifications);
        }catch(err){
            res.status(422).json({ message: "Erro ao recuperar notificações" });
        }
    }

    static async generateNotifications(req: Request, res: Response){
        const { type, stage, description, releaseName } = req.body;

        //verifica se já foi criado uma notificação para este lançamento com o mesmo estágio
        const isNotificationAlreadyCreated = await Notifications.findOne({ 
            where: { 
                "releaseName": releaseName,
                "stage": stage,
                "userId": req.user.id
            }
        })
        .catch(err => {
            res.status(422).json({ message: "Erro ao encontrar notificação" })
        });

        if(isNotificationAlreadyCreated){
            return res.status(422).json({ message: "A notificação para este lançamento já foi criada" });
        }

        await Notifications.create({
            type, stage, description, releaseName, userId: req.user.id, notificaionReadStatus: false 
        })
        .then(response => res.status(201).json({ message: "notificação criada!" }))
        .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }))
    }

    static async setNotificationsAsRead(req: Request, res: Response){
        
        try{
            await Notifications.update({ notificaionReadStatus: true }, { where: { notificaionReadStatus: false, 'userId': req.user.id  }});
            res.status(200).json({ message: "notificações marcadas como lidas" })
        }catch(err){
            res.status(422).json({ message: "Erro ao marcar as notificações como lidas" })
        }
    }
}