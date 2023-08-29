import express from "express";
import { config } from "dotenv";
import { router } from "./routes";
import { MongoClient } from "./database/Mongo";

const main = async () => {
    config();

    const app = express();

    await MongoClient.connect();

    app.use(express.json());

    app.listen(3333);

    app.use(router);
};

main();
