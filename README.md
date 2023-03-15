# Gameshow 33 Controller

This is a projector display manager built for the 2022 showing of Gameshow 33 at the Calgary Fringe. The system was built using Nuxt2, and is an online only application. Control pages and projection pages are connected using socket.io, and state information and configuration is stored in MongoDb.

Multiple controllers and projectors could be connected to the instance as state was synced across all clients using the socket.io interface.

To control, a user must log into the control page, where authentication is provided by auth0. The controller can set the current display presented to the projector (ie a game or a scene like the scoreboard or splash logo) and trigger in-display events like showing images, playing sounds and running arbitrary actions the projection page is listening for.

This projected was concluded following the closing of the 2022 Calgary Fringe Festival. It is now marked read only and has been taken offline, a demo application showing the premise of how the application worked may be constructed at a later time.


Create by Bea MacDonald in patnership with [The Kinkonauts](https://kinkonauts.com/)
