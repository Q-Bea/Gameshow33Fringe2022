module.exports = {
    apps: [
        {
            name: "Gameshow33Fringe2022",
            port: "10001",
            exec_mode: "cluster",
            instances: "max",
            script: "npm",
            args: "start"
        }
    ]
}