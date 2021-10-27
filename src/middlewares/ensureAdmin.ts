//responsavel pela verificaçao de dados que esta recebendo, dando permiçao ao usuario se pode ou nao acessar determinada rota
import { Request, Response, NextFunction} from "express";

export function ensureAdmin(request: Request, response: Response, next: NextFunction){
    const admin = true;

    if(admin){//se o admin tem permisao ele pode acessar a rota
        return next();
    }
    return response.status(401).json({//se o usuario nao for admin aparecerar o erro abaixo 
        error:"Unauthorized",
    });
}