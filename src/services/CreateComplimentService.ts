import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({ tag_id, user_sender, user_receiver, message}: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const usersRepositories = getCustomRepository(UsersRepositories);//necessario usar o userRepositories para a validaçao do usuario 
        
        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver");//camparaçao de usuarios o usuario que recebe eleogio nao pode ser o mesmo que envia 
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);//validando o usuario que vai receber o elogio pelo id do user_receiver

        if(!userReceiverExists){//se ele nao existir, apresentara um erro
            throw new Error("User Receiver does not exists!");
        };

        //depois da validaçao do usuario, pode ser criado um compliment
        const compliment = complimentsRepositories.create({ tag_id, user_receiver, user_sender, message});

        await complimentsRepositories.save(compliment);
        return compliment;
    }

}
export { CreateComplimentService }