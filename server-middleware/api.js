const app = require('express')()

const fs = require("fs")

app.get("/getDisplayAssetNames/:gameOrScene/:name/:assetType/", (req, res) => {
    //FIXME needs auth?
    if (
        typeof req.params.name === "string" && req.params.name.length < 20 &&
        typeof req.params.assetType === "string" && req.params.assetType.length < 20 &&
        (req.params.gameOrScene === "games" || req.params.gameOrScene === "scenes")
    ) {
        try {
            const assetNames = fs.readdirSync(process.cwd() + `/static/assets/${req.params.gameOrScene}/${req.params.name}/${req.params.assetType}`);

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