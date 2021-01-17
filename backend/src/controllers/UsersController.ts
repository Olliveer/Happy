import { Request, Response } from "express";
import User from "../models/User";
import usersView from "../views/users_view";
import * as Yup from "yup";

import { getRepository } from "typeorm";


export default {
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id);

        return res.json(usersView.render(user));
    },

    // async index(req: Request, res: Response) {
    //   const usersRepository = getRepository(Users);

    //   const users = await usersRepository.find();

    //   return res.json(usersView.render(users));
    // },

    async create(req: Request, res: Response) {
        const {
          name,
          email,
          password,         
        } = req.body;
    
        const userRepository = getRepository(User);
    
        const data = {
          name,
          email,
          password,          
        };
    
        const schema = Yup.object().shape({
          name: Yup.string().required("Campo nome vazio"),
          email: Yup.string().required(),
          password: Yup.string().required(),          
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });
    
        const user = userRepository.create(data);
    
        await userRepository.save(user);
        return res.status(201).json(user);
      },
};