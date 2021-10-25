import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService{

    async execute(name: string){
        const  tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Incorrect name!")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({//pesquisar no banco se ja existe o nome de uma tag, se nao existir ele vai criar essa tag
            name
        });

        if(tagAlreadyExists){
            throw new Error("Tag already exists!")
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);
        return tag;
    }
}
export { CreateTagService }