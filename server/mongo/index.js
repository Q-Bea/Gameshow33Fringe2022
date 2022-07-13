import { MongoClient } from "mongodb";
import MongoDisplayDataFunctions from "./display.js";
import MongoTeamDataFunctions from "./teams.js";
import MongoWheelDataFunctions from "./wheel.js";

export default class MongoInstance {
    connectCalled = false

    mongoClient

    /**
     * @type {MongoTeamDataFunctions}
     */
    teamDataFunctions

    /**
     * @type {MongoWheelDataFunctions}
     */
    wheelDataFunctions

    /**
     * @type {MongoDisplayDataFunctions}
     */
    displayDataFunctions

    constructor() {
        const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@gameshow33finge2022.ao3wxh7.mongodb.net/?retryWrites=true&w=majority`;

        this.mongoClient = new MongoClient(uri)
    }

    async awaitConnect() {
        if (this.connectCalled) return;
        
        this.connectCalled = true;
        try {
            await this.mongoClient.connect();
        } catch(e) {
            console.error(e);
            process.exit(1);
        }
        
        console.log("Mongo Connected!");

        const collection = this.mongoClient.db("server").collection("config");

        this.teamDataFunctions = new MongoTeamDataFunctions(collection);
        this.wheelDataFunctions = new MongoWheelDataFunctions(collection);
        this.displayDataFunctions = new MongoDisplayDataFunctions(collection);
    }
}