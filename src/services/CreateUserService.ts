import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
//regras da aplicaçao 
interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{
    async execute({ name, email, admin, password}: IUserRequest){//tratativa pra saber se o usuario ja esta cadastrado 
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

        const passwordHash = await hash(password, 8);//criptografando a senha antes de ir para o repositorio do banco de dados

        //criando um usuario e sauvando no repository
        const user = usersRepository.create({ name, email, admin, password: passwordHash});

        await usersRepository.save(user);
        return user;
    }
}
export {CreateUserService}