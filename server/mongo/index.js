//Is this necessary?

import { MongoClient } from "mongodb";
import MongoPlayerDataFunctions from "./players";

export default class MongoInstance {
    mongoClient
    playerDataFunctions

    constructor() {
        const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@gameshow33finge2022.ao3wxh7.mongodb.net/?retryWrites=true&w=majority`;

        this.mongoClient = new MongoClient(uri)

        this.mongoClient.connect((err) => {
            if (err) {
                console.err(err);
                process.exit(1);
            } else {
                console.log("Mongo Connected!");
            }
        });

        this.playerDataFunctions = new MongoPlayerDataFunctions(this.mongoClient.db("server").collection("config"))
    }
}