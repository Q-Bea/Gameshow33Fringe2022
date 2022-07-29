import { Collection } from "mongodb";

export default class MongoDisplayDataFunctions {
    /**
     * @type {Collection}
     */
    collection
    configName = "display"

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

    async setActiveDisplays(payload) {
        const set = {}

        if (typeof payload.current === "string") {
            set["activeDisplays.current"] = payload.current;
        } 

        if (typeof payload.pending === "string") {
            set["activeDisplays.pending"] = payload.pending;
        }

        try {
            const res = await this.collection.findOneAndUpdate({
                config: this.configName
            }, {
                $set: set
            }, {
                projection: {
                    "_id": 0,
                    "activeDisplays": 1
                },
                returnDocument: "after"
            })

            if (res.ok) {
                return res.value.activeDisplays;
            }

            throw Error();
        } catch(e) {
            console.error(`[MONGO] Failed to set active ${currentOrPending} display`)
            return undefined;
        }
    }

    async getActiveDisplays() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "activeDisplays": 1
                }
            })

            if (res) {
                return res.activeDisplays
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed get to get active displays");
            return undefined;
        }
    }

    async getAllKnownDisplays() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "validDisplays": 1
                }
            })

            if (res) {
                return res.validDisplays;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to get known displays")
            return undefined
        }
    }

    async getValidScenes() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "validDisplays.scenes": 1
                }
            })

            if (res) {
                return res.validDisplays?.scenes;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to get valid scenes");
            return undefined;
        }
    }

    async getValidGames() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "validDisplays.games": 1
                }
            })

            if (res) {
                return res.validDisplays?.games;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to get valid games");
            return undefined;
        }
    }

    async setGamesInUse(gamesObj) {
        try {
            if (Array.isArray(gamesObj.tech) && Array.isArray(gamesObj.noTech)) {
                const res = await this.collection.findOneAndUpdate({
                    config: this.configName
                }, {
                    $set: {
                        gamesInUse: gamesObj
                    }
                }, {
                    upsert: true,
                    projection: {
                        "_id": 0,
                        "gamesInUse": 1
                    },
                    returnDocument: "after"
                })

                if (res.ok) {
                    return res.value.gamesInUse;
                }
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to set games in use");
            return undefined;
        }
    }

    async getGamesInUse() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    "_id": 0,
                    "gamesInUse": 1
                }
            });

            if (res) {
                return res.gamesInUse;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to get games in use");
            return undefined;
        }
    }
}