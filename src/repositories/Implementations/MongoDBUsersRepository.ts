import { MongoClient } from "../../database/Mongo";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class MongoDBUsersRepository implements IUsersRepository {
    async findByEmail(email: string): Promise<User> {
        const user = await MongoClient.db
            .collection("users")
            .findOne({ email: email });

        return user;
    }
    async save(user: User): Promise<void> {
        await MongoClient.db.collection("users").insertOne(user);
    }
}
