import { MailtrapMailProvider } from "../../providers/Implementations/MailtrapMailProvider";
import { MongoDBUsersRepository } from "../../repositories/Implementations/MongoDBUsersRepository";
//import { PostgresUsersRepository } from "../../repositories/Implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
//const postgresUsersRepository = new PostgresUsersRepository();
const mongodbUsersRepository = new MongoDBUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    mongodbUsersRepository,
    mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
