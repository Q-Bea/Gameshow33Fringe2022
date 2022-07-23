import { Collection } from "mongodb";

export default class MongoDisplayEventFunctions {
    /**
     * @type {Collection}
     */
    collection

    constructor(collection) {
        this.collection = collection;
    }

    async setKeyVal(currentDisplayName, key, value) {
        try {
            if (
                typeof currentDisplayName === "string" &&
                (typeof key === "string" || typeof key === "number") &&
                typeof value !== "undefined"
            ) {
                const res = await this.collection.findOneAndUpdate({
                    displayName: currentDisplayName
                }, {
                    $set: {
                        [`data.${key}`]: value
                    }
                }, {
                    returnDocument: "after",
                    upsert: true,
                    projection: {
                        "_id": 0,
                        "data": 1
                    }
                })

                if (res.ok) {
                    return res.data
                }
            }
    
            throw Error()
        } catch(e) {
            console.error("[MONGO] Failed to set display event key val pair");
            return undefined;
        }
    }

    async getData(currentDisplayName) {
        try {
            if (typeof currentDisplayName === "string") {
                const res = await this.collection.findOne({
                    displayName: currentDisplayName
                }, {
                    projection: {
                        "_id": 0,
                        "data": 1
                    }
                })

                if (res) {
                    return res.data;
                }
            }
    
            throw Error()
        } catch(e) {
            console.error("[MONGO] Failed to get display event key value");
            return undefined;
        }
    }
}