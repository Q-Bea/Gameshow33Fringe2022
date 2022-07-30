import { MongoClient } from "mongodb";
import MongoDisplayDataFunctions from "./display.js";
import MongoDisplayEventFunctions from "./displayEvent.js";
import MongoTeamDataFunctions from "./teams.js";
import MongoWheelDataFunctions from "./wheel.js";
import MongoKeystoneDataFunctions from "./keystone.js";

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

    /**
     * @type {MongoKeystoneDataFunctions}
     */
    keystoneDataFunctions

    /**
     * @type {MongoDisplayEventFunctions}
     */
    displayEventFunctions

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

        const configCollection = this.mongoClient.db("server").collection("config");
        const eventCollection = this.mongoClient.db("server").collection("displayEvents")

        this.teamDataFunctions = new MongoTeamDataFunctions(configCollection);
        this.wheelDataFunctions = new MongoWheelDataFunctions(configCollection);
        this.displayDataFunctions = new MongoDisplayDataFunctions(configCollection);
        this.keystoneDataFunctions = new MongoKeystoneDataFunctions(configCollection);

        this.displayEventFunctions = new MongoDisplayEventFunctions(eventCollection);
    }
}