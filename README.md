# Gameshow 33 Controller

This is a projector display manager built for the 2022 showing of Gameshow 33 at the Calgary Fringe. The system was built using nuxt2, and is an online only application. Control pages and projection pages are connected using socket.io, and state information and configuration is stored in MongoDb.

To control, a user must log into the control page, where authentication is provided by auth0. The control can set the current display presented to the projector (ie a game or a scene like the scoreboard or splash logo), and also trigger in-display events like showing images, playing sounds and running arbitrary actions the projection page is listening for.