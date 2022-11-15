import { Request, Response } from "express";
import { Notifications } from "../models/Notifications";
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


        let customMessage = ''
        switch(type){
            case 'comingsoon':
                customMessage = `${release.name} está programado para lançar daqui à ${days} dias.`;
                //
                console.log(release.name);
                console.log(customMessage);

                await Notifications.create({
                    type: 'EM BREVE', description: customMessage, userId: req.user.id
                })
                .then(response => res.status(201).json({ message: "Notificação criada com sucesso" }))
                .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }));
            break;
            case 'released':
                if(days === 0){
                    customMessage = `${release.name} acaba de ser lançado`;
                }else {
                    customMessage = `${release.name} foi lançado à ${days} dias`;
                }
                
                //
                console.log(release.name);
                console.log(customMessage);

                await Notifications.create({
                    type: 'LANÇOU', description: customMessage, userId: req.user.id
                })
                .then(response => res.status(201).json({ message: "Notificação criada com sucesso" }))
                .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }));
            break;
        }

    }
}