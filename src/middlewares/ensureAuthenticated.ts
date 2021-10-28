import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken"

interface IPayload{
    sub: string;
}

export function ensureAuthenticated( request: Request, response: Response, next: NextFunction){
    //receber o token 
    const authToken = request.headers.authorization;
    
    //validar se tokem esta preenchido 
    if(!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //validar se token é valido 
        const { sub } = verify(token, "20884aaffa6faefc1253cc4f91f5c807") as IPayload;

        //recuperar imformaçoes do usuario 
        request.user_id = sub;
        return next();

    } catch (error) {
        return response.status(401).end();
    }
}