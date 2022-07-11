//FIXME?? protection to ensure sockets come from authorized client

const data = {
    playerData: {
        team1: [],
        team2: []
    },
    wheelData: {
        options: []
    },
    sceneName: "Base"
}

export default function (socket, io) {
    return {
        //----SCENE DATA SOCKET----
        sceneEvent(payload) {
            io.emit("sceneEvent", payload);
        },

        changeScene(sceneName) {
            data.sceneName = sceneName

            io.emit("changeScene", data.sceneName);
        },

        getCurrentScene(cb) {
            try {
                if (cb) cb(data.sceneName);
            } catch(e) {
                //
            }
        },
        //----End SCENE DATA----

        //----PLAYER SOCKETS----
        setPlayerNames(payload) {
            payload.team1?.forEach((name, i) => {
                if (data.playerData.team1[i]) {
                    data.playerData.team1[i].name = name;
                } else {
                    data.playerData.team1[i] = {name: name};
                }
                if (payload.reset) data.playerData.team1[i].points = 0;
            })

            payload.team2?.forEach((name, i) => {
                if (data.playerData.team2[i]) {
                    data.playerData.team2[i].name = name;
                } else {
                    data.playerData.team2[i] = {name: name};
                }
                if (payload.reset) data.playerData.team2[i].points = 0;
            })

            io.emit("playersUpdate", data.playerData)
        },

        resetPlayerPoints() {
            data.playerData.team1.forEach(player => {
                player.points = 0;
            })

            data.playerData.team2.forEach(player => {
                player.points = 0;
            })

            io.emit("playersUpdate", data.playerData)
        },

        addPoints(payload) {
            data.playerData[payload.teamName].find(player => player.name === payload.playerName).points += payload.points;

            io.emit("playersUpdate", data.playerData)
        },

        getPlayerData(cb) {
            try {
                if (cb) cb(data.playerData);
            } catch(e) {
                //
            }
        },
        //----END PLAYER SOCKETS----

        //----WHEEL SOCKETS----
        setWheelOptions(payload) {
            data.wheelData.options = payload;

            io.emit("wheelUpdate", data.wheelData.options)
        },

        getWheelOptions(cb) {
            try {
                if (cb) cb(data.wheelData.options);
            } catch(e) {
                //
            }
        }
        //----END WHEEL SOCKETS----
    }
}