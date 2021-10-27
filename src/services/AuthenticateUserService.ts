import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest{
    email: string;
    password: string;
}
class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UsersRepositories);

        //verificar se o email ja existe
        const user = await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        };

        //verificar se a senha esta correta 
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Password")
        };

        //gerar um token se a senha for correta 
        const token = sign({
            email: user.email
        },"20884aaffa6faefc1253cc4f91f5c807", {//hash gerada por um site do google
            subject : user.id,
            expiresIn: "1d" //espiraçao de 1 dia 
        });
        return token;
    }
}
export { AuthenticateUserService }