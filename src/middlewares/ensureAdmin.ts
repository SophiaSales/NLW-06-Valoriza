//responsavel pela verificaçao de dados que esta recebendo, dando permiçao ao usuario se pode ou nao acessar determinada rota
import { Request, Response, NextFunction} from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    
    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);
    
    const {admin} = await usersRepositories.findOne(user_id);

    if(admin){//se o admin tem permisao ele pode acessar a rota
        return next();
    }
    return response.status(401).json({//se o usuario nao for admin aparecerar o erro abaixo 
        error:"Unauthorized",
    });
}