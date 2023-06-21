/**
 * If, for some reason, online functions like auth
 * can't be used, enable offline mode to bypass errors produced
 * by disabling authentication
 * 
 * Note: Make sure to disable the auth middleware on each page
 */
const OFFLINE_MODE = false;

import jwt from "jsonwebtoken";
import MongoInstance from "./mongo";
const db = new MongoInstance();
db.awaitConnect();

// signingPub is from advanced settings in Auth0
const signingPub = `-----BEGIN CERTIFICATE-----
MIIDFTCCAf2gAwIBAgIJeA7dWDTL9KLgMA0GCSqGSIb3DQEBCwUAMCgxJjAkBgNV
BAMTHXNob3djYXNlLWczM2RlbW8udXMuYXV0aDAuY29tMB4XDTIzMDYxNjIyNTQ0
MFoXDTM3MDIyMjIyNTQ0MFowKDEmMCQGA1UEAxMdc2hvd2Nhc2UtZzMzZGVtby51
cy5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCLg5za
bU0v4FNokiokfZpF8bDjiV9sGHiwCpTMfLfD/KRES2DQPolhQfXT5EjdeMxEWfLh
KVutfEA3ejvg+Wkik/jlY4m+9xmO/ewK9u0qyZHZ071P5BeH91Zj59ZWhQiXn0Yg
8VbUv2bY+OeUkZ4/ottZpSs9tbnKJX6ZdVI2ct383wG1Xij6mtV0BtQ6i10WubpG
OjtXWpD5IM/0Ig/fyC9DbsPszudj7mviRA7J0xZUyd6ZFSYVACErr1yG0z6mt9e3
Q3N9g5NWDjVly+m/GurNl8YgHebJ1jjXz9Oz0uxPxNx/L8CCQqy5M+VzCxzsHEX9
Eonf8E/tMOK7hU0pAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE
FMMy24QdnsBw9kGYpG6lHhLFhWj6MA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0B
AQsFAAOCAQEADhGmrNYrLv0Bbpk9FPEreyLSJtoksezk4KVVpJOSmCRAGTNtuJ/M
IT2I2E+aFhT+DF1o37ZFtKrUS4qc1fsB/MFxgS/HlrPw4jFiJXHHxuK6frhdX5N2
Gpyr1UUNWc5ob3Xu4c54sdB3oX7ELDJU9hRGElEFhJYukf6CmnFPoayQEh+O6ABf
UcZBXfMLk/Ri+i8BOh/0vnIQkbta9jyWP+z84CBa7aMUKHecKRK9do0nXSuAv4I4
pqqEyPIrtMZNW8FRRKHkEYyGlYZEEGfFW9JHUx9pQRfa7gFz7tlA344XKf9f3+HR
YaZ3zwoOQNRVXEQ7ea8ZakOd24G5ZR3jDg==
-----END CERTIFICATE-----`

/**
 * 
 * @param {*} socket 
 * @returns -1 if no cookie, false (0) if no auth, true (1) if auth
 */
function authenticate(socket) {
    if (OFFLINE_MODE) return true;

    const cookie = socket.handshake.headers.cookie;
    try {
        if (cookie) {
            const split = cookie.split(";");
    
            if (split.length > 0) {
                const find = split.find(part => part.trim().startsWith("auth._token.auth0"));
                if (find != undefined) {
                    const rel = find.split("=");
                    
                    const res = jwt.verify(rel[1].substring(9), signingPub, {algorithm: "RS256"})
                    return res.iss === process.env.AUTH0_DOMAIN_NAME
                    //If we made it here, the token is valid
                    //(jwt produces errors if invalid)
                }
            }
        }
        return -1;
    } catch(e) {
        return -1;
    }
}

function authCheck(socket) {
    const authRes = authenticate(socket)
    switch (authRes) {
        case -1: 
            return false
        case 0: 
        case false:
            socket.disconnect(true);
            return false;
        case 1: 
        case true:
            return true;
        default:
            return false;
    }
}

export default function Svc(socket, io) {
    return Object.freeze({
        //----DISPLAY DATA SOCKET----
        async setActiveDisplays(payload) {
            if (!authCheck(socket)) return;

            if (!payload) return;

            const res = await db.displayDataFunctions.setActiveDisplays({
                current: payload.current, 
                pending: payload.pending
            });

            io.emit("activeDisplaysUpdate", res)
        },

        async getActiveDisplays() {
            try {
                const res = await db.displayDataFunctions.getActiveDisplays();
                        
                return res;
            } catch(e) {
                return;
            }
        },

        async getAllKnownDisplays() {
            try {
                const res = await db.displayDataFunctions.getAllKnownDisplays();

                return res;
            } catch(e) {
                return;
            }
        },

        async getValidScenes() {
            try {
                const res = await db.displayDataFunctions.getValidScenes();
                
                return res;
            } catch(e) {
                return;
            }
        },

        async setValidGames(payload) {
            if (!authCheck(socket)) return;

            try {
                if (!payload) return;
    
                const res = await db.displayDataFunctions.setValidGames({
                    tech: payload.tech, 
                    noTech: payload.noTech
                });

    
                io.emit("validDisplaysUpdate", res)
            } catch(e) {
                return;
            }
        },

        async getValidGames() {
            try {
                const res = await db.displayDataFunctions.getValidGames();

                return res;
            } catch(e) {
                return
            }
        },

        async getGamesInUse() {
            try {
                const res = await db.displayDataFunctions.getGamesInUse();
                
                return res;
            } catch(e) {
                return;
            }
        },

        async setGamesInUse(gameObj) {
            if (!authCheck(socket)) return;

            if (gameObj == undefined || typeof gameObj !== "object") return;

            if (!Array.isArray(gameObj.tech) || !Array.isArray(gameObj.noTech)) return;

            const res = await db.displayDataFunctions.setGamesInUse(gameObj);

            io.emit("gamesInUseUpdate", res);
        },
        //----End SCENE DATA----

        //----PLAYER SOCKETS----
        async setTeams(payload) {
            /*
             * Expected Payload:
             *  {
             *      teams: [
             *          {
             *              players: string[],
             *              teamName: string
             *          },
             *          ...
             *      ],
             *      resetScores: boolean,
             *  }
             */

            if (!authCheck(socket)) return;

            if (Array.isArray(payload.teams)) {
                const res = await db.teamDataFunctions.setTeams(payload.teams, payload.resetScores);

                io.emit("teamsUpdate", res)
            }
        },

        async resetPlayerPoints() {
            if (!authCheck(socket)) return;

            const res = await db.teamDataFunctions.reset(true);

            io.emit("teamsUpdate", res)
        },

        async addPlayerPoints(payload) {
            if (!authCheck(socket)) return;

            if (payload && 
                payload.points && 
                typeof payload.points === "number" &&
                typeof payload.teamIndex === "number"
            ) {
                const res = await db.teamDataFunctions.addTeamPoints(
                    payload.teamIndex,
                    payload.points
                )

                io.emit("teamsUpdate", res)
            }
        },

        async getTeamsData() {
            /*
            [
                {
                    players: string[],
                    teamName: string
                    points: number
                },
                ...
            ]
            */
            try {
                const res = await db.teamDataFunctions.getTeamData();
                
                return res;
            } catch(e) {
                return;
            }
        },
        //----END PLAYER SOCKETS----

        //----WHEEL SOCKETS----
        async setWheelOptions(options) {
            if (!authCheck(socket)) return;

            if (Array.isArray(options)) {
                const res = await db.wheelDataFunctions.setWheelOptions(options);

                io.emit("wheelUpdate", res)
            }
        },

        async getWheelOptions() {
            try {
                const res = await db.wheelDataFunctions.getWheelOptions();
                
                return res;
            } catch(e) {
                return;
            }
        },
        //----END WHEEL SOCKETS----

        //----DISPLAY EVENT SOCKETS----

        /*
        These endpoints behave slightly differently
        than the others. By self-defined convention,
        if a single key of a larger data structure is update,
        a signal is emitted containing the entirety of the structure,
        instead of just the changed part.
        
        As this behaviour is more complex to implement here, as not all
        display events will save data to mongo, data emissions here will only contain
        updated data directly provided by the emitter.
        */
        async displayEvent(payload) {
            try {
                if (!authCheck(socket)) return;
    
                if (typeof payload === "object") {
                    if (payload.eventName == undefined) return;
                    //A name is required for all emissions, so that
                    //type can be filtered

                    if (payload.save) {
                        db.displayEventFunctions.setKeyVal(
                            payload.writeToDisplay,
                            payload.eventName,
                            payload.value
                        )
                    }
                    
                    io.emit("displayEvent", payload);
                }

                throw Error();
            } catch(e) {
                //
            }
        },

        async getSavedDisplayEventData(displayName) {
            try {
                if (typeof displayName === "string") {
                    const res = await db.displayEventFunctions.getData(displayName);
                    
                    return res;
                }
                
                throw Error()
            } catch(e) {
                return;
            }
        },

        //----END DISPLAY EVENT SOCKETS----

        //----SET KEYSTONE SOCKETS----
        async setKeystone(value) {
            if (!authCheck(socket)) return;

            if (typeof value == "number") {
                const res = await db.keystoneDataFunctions.setKeystone(value);
                
                io.emit("keystoneUpdate", res)
            }
        },

        async getKeystone() {
            try {
                const res = await db.keystoneDataFunctions.getKeystone();
                
                return res;
            } catch(e) {
                return;
            }
        },
        //----END KEYSTONE SOCKETS----

        //----START CONNECTION QUERY SOCKETS----
        async queryRoomConnections(roomName) {
            if (!authCheck(socket)) return;

            if (typeof roomName !== "string") return undefined;

            try {
                const clients = io.sockets.adapter.rooms.get(`query-${roomName.toLowerCase()}`).size;
                return clients != undefined && clients > 0
            } catch(e) {
                //
            }
            return false;
        },

        joinQueryRoom(roomName) {
            if (typeof roomName === "string") {
                socket.join(`query-${roomName}`)
            }
        },
        //----END CONNECTION QUERY SOCKETS----

        //----START TIMER PAGE SOCKETS----
        flashClock() {
            if (!authCheck(socket)) return;

            io.emit("flashClock");
        }
        //----END TIMER PAGE SOCKETS----
    })
}