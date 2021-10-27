import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"
// controlers vai receber as os dados da requisiçao e vai repassar para o services atendendo as regrinhas da aplicaçao  
class CreateUserController {
    async handle(request: Request, response: Response) {
        // try{}
        const { name, email, admin, password  } = request.body;
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, admin, password });

        return response.json(user);
        // }catch(err){//tratando o erro se try nao for executado retorna mensagem de erro pelo catch
        //     return response.status(400).json({error: err.message})
    }
}
export { CreateUserController }