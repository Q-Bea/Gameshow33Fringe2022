import { Collection } from "mongodb";

export default class MongoTeamDataFunctions {
    /**
     * @type {Collection}
     */
    collection
    configName = "players"

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

    async setTeams(teamObjArr, resetScores = true) {
        try {
            if (!Array.isArray(teamObjArr)) throw Error();
            if (teamObjArr.length !== 2) throw Error();

            const payload = {}

            if (Array.isArray(teamObjArr[0].players)) {
                payload["data.0.players"] = teamObjArr[0].players
                payload["data.0.teamName"] = teamObjArr[0].teamName ?? "Team 1"

                if (resetScores) payload["data.0.points"] = 0
            }

            if (Array.isArray(teamObjArr[1].players)) {
                payload["data.1.players"] = teamObjArr[1].players
                payload["data.1.teamName"] = teamObjArr[1].teamName ?? "Team 2"

                if (resetScores) payload["data.1.points"] = 0
            }

            const res = await this.collection.findOneAndUpdate({
                config: this.configName
            }, {
                $set: payload
            }, {
                upsert: true,
                projection: {
                    "_id": 0,
                    "data": 1
                },
                returnDocument: "after"
            })

            if (res.ok) {
                return res.value.data;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to set player names")
            return undefined;
        }
    }

    async getTeamData() {
        try {
            const res = await this.collection.findOne({
                config: this.configName
            }, {
                projection: {
                    _id: 0,
                    data: 1
                }
            });

            return res.data;
        } catch(e) {
            console.error("[MONGO] Failed to retrieve team data")
            return undefined;
        }
    }

    async addTeamPoints(teamIndex, points) {
        try {
            const res = await this.collection.findOneAndUpdate({
                config: this.configName,
            },  {
                $inc: {
                    [`data.${teamIndex}.points`]: points
                }
            },  {
                projection: {
                    "_id": 0,
                    "data": 1
                },
                returnDocument: "after"
            })

            if (res.ok) {
                return res.value.data;
            }

            throw Error();
        } catch(e) {
            console.error("[MONGO] Failed to add points to teamIndex " + teamIndex);
            return undefined;
        }
    }

    async reset(justPoints = false) {
        try {
            if (!justPoints) {
                const res = await this.collection.findOneAndUpdate({
                    config: "players"
                }, {
                    $set: {
                        data: [
                            {
                                teamName: "Team 1",
                                players: [],
                                points: 0
                            },
                            {
                                teamName: "Team 2",
                                players: [],
                                points: 0
                            }
                        ]
                    }
                },  {
                    upsert: true,
                    projection: {
                        "_id": 0,
                        "data": 1
                    },
                    returnDocument: "after"
                });
    
                if (res.ok) {
                    return res.value.data;
                }
    
                throw Error();
            } else {
                const res = await this.collection.findOneAndUpdate({
                    config: this.configName
                },  {
                    $set: {
                        "data.$[team].points": 0
                    }
                },  {
                    arrayFilters: [{
                        "team.points": {
                            $ne: 0
                        }
                    }],
                    projection: {
                        "_id": 0,
                        "data": 1
                    },
                    returnDocument: "after",
                    multi: true
                })

                if (res.ok) {
                    return res.value.data;
                }
            }
        } catch(e) {
            console.error("[MONGO] Failed to reset points or team data");
            return undefined;
        }
    }
}