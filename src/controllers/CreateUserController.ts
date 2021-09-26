import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    
    async handle(request: Request, response: Response) {
        
        const { name, email, admin } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, admin });
        
        console.log("Valor do response" + user);
        
        return response.json(user);
    }
}

export { CreateUserController }