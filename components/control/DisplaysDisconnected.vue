<template>
    <v-container class="status-chip-container">
        <DisplayStatusChip
            v-for="room in queryRooms"
            :key="room"
            :connectedIcon="icons[room.toLowerCase()][0]"
            :disconnectedIcon="icons[room.toLowerCase()][1]"
            :displayedName="room"
            :queryRoom="room.toLowerCase()"
        />
    </v-container>
</template>

<style scoped>
.status-chip-container {
    position: fixed; 
    top: 0; 
    right: 0; 
    width: min-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>

<script>
import DisplayStatusChip from './DisplayStatusChip.vue'
export default {
    data() {
        return {
            queryRooms: ["Projector", "Clock"],
            icons: {
                projector: ["mdi-cast-connected", "mdi-cast-off"],
                clock: ["mdi-clock-check-outline", "mdi-clock-alert"]
            }
        };
    },
    mounted() {
        //This is a periodic checker (because the server doesn't have access to the disconnect event)
        //so every few seconds, ask the io server to lookup if a projector client is connected
        this.projectorQuery();
    },
    methods: {
        async projectorQuery() {
            for await (const room of this.queryRooms) {
                try {
                    const connected = await this.$root.socket.emitP("queryRoomConnections", room);
                    this.$nuxt.$emit("statusUpdate", {
                        name: room.toLowerCase(),
                        status: connected
                    })
                }
                catch (e) {
                    //
                }
            }

            setTimeout(() => {
                this.projectorQuery();
            }, 5000);
        }
    },
    components: { DisplayStatusChip }
}
</script>