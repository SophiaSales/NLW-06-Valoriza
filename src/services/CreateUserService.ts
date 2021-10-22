import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService{
    async execute({ name, email, admin}: IUserRequest){//tratativa pra saber se o usuario ja esta cadastrado 
        const usersRepository = getCustomRepository(UsersRepositories);
        
        //se nao tiver nenhum email cadastrado aparecera o erro 
        if(!email){
            throw new Error("Email incorrect");
        }

        //pesquisa para comferir se ja existe um usuario cadastrado pelo o email
        const userAlreadyExists = await usersRepository.findOne({
            email,
        });
        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        //criando um usuario e sauvando no repository
        const user = usersRepository.create({ name, email, admin});

        await usersRepository.save(user);
        return user;
    }
}
export {CreateUserService}