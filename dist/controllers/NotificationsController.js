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
exports.NotificationsController = void 0;
const Notifications_1 = require("../models/Notifications");
const UserList_1 = require("../models/UserList");
class NotificationsController {
    static getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield Notifications_1.Notifications.findAll({
                    where: { "userId": req.user.id },
                    order: [['createdAt', 'ASC']]
                });
                res.status(200).json(notifications);
            }
            catch (err) {
                res.status(422).json({ message: "Erro ao recuperar notificações" });
            }
        });
    }
    static generateNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, stage, description, releaseName } = req.body;
            //verifica se já foi criado uma notificação para este lançamento com o mesmo estágio
            const isNotificationAlreadyCreated = yield Notifications_1.Notifications.findOne({
                where: {
                    "releaseName": releaseName,
                    "stage": stage,
                    "userId": req.user.id
                }
            })
                .catch(err => {
                res.status(422).json({ message: "Erro ao encontrar notificação" });
            });
            if (isNotificationAlreadyCreated) {
                return res.status(422).json({ message: "A notificação para este lançamento já foi criada" });
            }
            //precisa verificar se o lançamento está na lista do usuário
            const userlist = yield UserList_1.UserList.findAll({ where: { "userId": req.user.id } });
            let isOnTheList = false;
            userlist.map((item) => {
                if (item.name === releaseName)
                    isOnTheList = true;
            });
            if (isOnTheList) {
                yield Notifications_1.Notifications.create({
                    type, stage, description, releaseName, userId: req.user.id, notificaionReadStatus: false
                })
                    .then(response => res.status(201).json({ message: "notificação criada!" }))
                    .catch(err => res.status(422).json({ message: "Erro ao criar notificação" }));
            }
            else {
                res.status(422).json({ message: "Este lançamento não está na sua lista" });
            }
        });
    }
    static setNotificationsAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Notifications_1.Notifications.update({ notificaionReadStatus: true }, { where: { notificaionReadStatus: false, 'userId': req.user.id } });
                res.status(200).json({ message: "notificações marcadas como lidas" });
            }
            catch (err) {
                res.status(422).json({ message: "Erro ao marcar as notificações como lidas" });
            }
        });
    }
}
exports.NotificationsController = NotificationsController;
