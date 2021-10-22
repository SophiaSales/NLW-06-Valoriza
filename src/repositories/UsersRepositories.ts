import {EntityRepository, Repository} from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User>{ // estendodo a classe Repository tera acesso a todos o metudos da classe User

}
export { UsersRepositories };