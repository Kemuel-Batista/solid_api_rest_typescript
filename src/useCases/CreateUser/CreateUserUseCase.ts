import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

/**
 * UseCase se preocupa apenas na regra de negócio da aplicação,
 * não está preocupado com o infra (BD, POSTGRES, SQL, OUTRAS FERRAMENTAS)
 */

/**
 * 1 - SRP -> Single Responsibility Principle
 * Essa classe tem uma única responsabilidade que é a criação do usuário
 * ela não tem a responsabilidade de como esse usuário irá ser salvo,
 * se vai para um banco, json, arquivo, api de terceiro
 * Só verificar se o usuário existe ou não e criar caso não exista
 */

/**
 * 3 - LSP -> Liskov Substitution Principle
 * A partir do momento que recebemos usersRepository que é do tipo IUsersRepository
 * que é um contrato que define quais são os métodos que vão existir dentro do repositório
 * não interessa qual repositório será (mongo, postgres, mysql)
 */

/**
 * 5 - DIP -> Dependency Inversion Principle
 * A classe não está dependendo diretamente da implementação do repositório (INSERT, UPDATE)
 * eu estou dependendo de uma abstração (interface) da aquela implementação
 */

export class CreateUserUseCase {
    // private usersRepository: IUsersRepository;
    // constructor(usersRepository: IUsersRepository){
    //     this.usersRepository = usersRepository;
    // }
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(
            data.email
        );

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "Equipe do meu App",
                email: process.env.MAILTRAP_EMAIL,
            },
            subject: "Seja bem vindo",
            body: "<p>Você já pode fazer login em nossa plataforma</p>",
        });
    }
}
