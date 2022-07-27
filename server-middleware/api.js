const app = require('express')()

const fs = require("fs")

app.get('/getGameAssetNames/:game/:type', async (req, res) => {
    //FIXME need auth?
    if (
        typeof req.params.game === "string" && req.params.game.length < 20 &&
        typeof req.params.type === "string" && req.params.type.length < 20 
    ) {
        try {
            const assetNames = fs.readdirSync(process.cwd() + `/static/assets/games/${req.params.game}/${req.params.type}`);

            if (Array.isArray(assetNames)) {
                res.status(200).json({ok: true, names: assetNames})
                return
            }
        } catch(e) {
            //
        }
    }

    res.status(404).json({ok: false})
})

console.log("API ready!")

module.exports = app