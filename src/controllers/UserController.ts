import { Request, Response } from "express";
import Bcrypt from 'bcrypt';
import { User } from "../models/User";
import { UserList } from "../models/UserList";
import jwt from 'jsonwebtoken';
import { Notifications } from "../models/Notifications";

interface UserProps {
    name: string,
    password: string
}

export class UserController
{
    static async register(req: Request, res: Response){
        const { name, email, password, confirmpassword } = req.body;

        //todos os campos foram preenchidos?
        if(!name || !email || !password|| !confirmpassword){
            return res.status(422).json({ message: "Todos os campos são obrigatórios" });
        }

        //a senha e a confirmação são iguais?
        if(password !== confirmpassword){
            return res.status(422).json({ message: "As senhas não coincidem" });
        }

        //o usuário já existe no banco?
        const userExists = await User.findOne({ where: { "email": email }});
        if(userExists){
            return res.status(422).json({ message: "Este endereço de e-mail já foi cadastrado" });
        }
        
        //criptografa a senha
        const salt = await Bcrypt.genSalt(12);
        const hashedPassword = await Bcrypt.hash(password, salt);

        //cria a lista
        await UserList.create();

        //cria o usuário
        const user = await User.create({
            name, email, password: hashedPassword
        })
        .then((() => res.status(201).json({ message: "Cadastro realizado com sucesso!" })))
        .catch((err: Error) => res.status(201).json({ message: "Erro ao cadastrar usuário", err }));
    }

    static async login(req: Request, res: Response){
        const { email, password } = req.body;

        //os campos foram preenchidos?
        if(!email || !password){
            return res.status(422).json({ message: "Todos os campos são obrigatórios" });
        }

        //o email existe no banco de dados?
        const user: any = await User.findOne({ where: { "email": email } });
        if(!user){
            return res.status(422).json({ message: "Usuário não encontrado"});
        }
        

        //a senha coincide com a registrada no banco de dados?
        const isPasswordCorrect = await Bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);
        if(!isPasswordCorrect){
            return res.status(422).json({ message: "Por favor, verifique se os dados foram preenchidos corretamente" });
        }
        
        //gera o token
        try{
            const token = await jwt.sign({
                id: user.id
            }, 'jfn30tk5#4f$');
            res.status(200).json({ message: "Login efetuado com sucesso", token });
        }catch(err){
            res.status(422).json({ message: "Erro ao fazer login" });
        }
    }

    static async getUser(req: Request, res: Response){
        const user = await User.findOne({include: [UserList, Notifications], where: { "id": req.user.id } })

        res.status(200).json({ user })
    }
}