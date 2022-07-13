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
            if (teamObjArr.length > 2) throw Error();
            if (teamObjArr.length == 0) throw Error();

            const payload = {}

            if (Array.isArray(teamObjArr[0]?.players)) {
                teamObjArr[0].players.forEach((player, i) => {
                    payload[`data.0.players.${i}.name`] = player;
                    if (resetScores) payload[`data.0.players.${i}.points`] = 0;
                })

                if (teamObjArr[0].teamName) {
                    payload[`data.0.teamName`] = teamObjArr[0].teamName;
                }
            }

            if (Array.isArray(teamObjArr[1]?.players)) {
                teamObjArr[1].players.forEach((player, i) => {
                    payload[`data.1.players.${i}.name`] = player;
                    if (resetScores) payload[`data.1.players.${i}.points`] = 0;
                })

                if (teamObjArr[1].teamName) {
                    payload[`data.1.teamName`] = teamObjArr[1].teamName
                }
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
            });

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
            console.error("[MONGO] Failed to retrieve player data")
            return undefined;
        }
    }

    async addPlayerPoints(playerIndex, teamIndex, points) {
        try {
            const res = await this.collection.findOneAndUpdate({
                config: this.configName,
            },  {
                $inc: {
                    [`data.${teamIndex}.players.${playerIndex}.points`]: points
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
            console.error("[MONGO] Failed to add points to player " + playerName);
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
                                players: []
                            },
                            {
                                teamName: "Team 1",
                                players: []
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
            } else if (points) {
                const res = await this.collection.findOneAndUpdate({
                    config: this.configName
                },  {
                    $set: {
                        "data.$[team].players.$[player].points": 0
                    }
                },  {
                    arrayFilters: [{
                        "player.points": {
                            $ne: 0
                        },
                        "team.players": {
                            $ne: null
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
            console.error("[MONGO] Failed to reset player or team data");
            return undefined;
        }
    }
}