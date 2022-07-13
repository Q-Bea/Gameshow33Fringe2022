import { Collection } from "mongodb";

export default class MongoWheelDataFunctions {
    /**
     * @type {Collection}
     */
    collection
    configName = "wheel"

    constructor(collection) {
        this.collection = collection;

        this.#ensureDocumentExists()
    }

    async #ensureDocumentExists() {
        try {
            await this.collection.updateOne({
                config: this.configName
            },
            {
                $set: {
                    config: this.configName
                }
            },
            {
                upsert: true
            })
        } catch(e) {
            console.error("[MONGO] Failed to valid data config " + this.configName +". Killing process!");
            process.exit(1);
        }
    }

    async setWheelOptions(optionsArr) {
        try {
            if (Array.isArray(optionsArr)) {
                const res = await this.collection.findOneAndUpdate({
                    config: this.configName,
                },
                {
                    $set: {
                        data: optionsArr
                    }
                },
                {
                    upsert: true,
                    projection: {
                        "_id": 0
                    },
                    returnDocument: "after"
                })

                if (res.ok) {
                    return res.value.data;
                }
            }
            throw Error();
            
        } catch(e) {
            console.error("[MONGO] Failed to set wheel options");
            return undefined;
        }
    }

    async getWheelOptions() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "data": 1
                }
            })

            if (res) {
                return res.data;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to get wheel options");
            return undefined;
        }
    }
}