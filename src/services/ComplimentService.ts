import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    user_sender : string,
    user_receiver: string,
    tag_id: string,
    message: string
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
        
        const complimentRepositorie = getCustomRepository(ComplimentRepositories);
        
        const userRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver");
        }
        /**Realiza a buscar pelo usuario receiber na tabela do usuarios*/
        const userReceiverExists = await userRepositories.findOne(user_receiver);

        if(!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentRepositorie.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        console.log(compliment);
        await complimentRepositorie.save(compliment);
        
        return compliment;
    }
}

export { CreateComplimentService }