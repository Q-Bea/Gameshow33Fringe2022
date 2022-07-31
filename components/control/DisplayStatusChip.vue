<template>
    <v-slide-x-reverse-transition 
        mode="out-in"
    >
        <v-chip
            class="status-chip" 
            :color="colour"
            v-if="display && !dismissed"
            :close="status !== true"
            @click:close="close"
        >
            <v-icon small>{{status ? (connectedIcon ?? 'mdi-cast-connected') : (disconnectedIcon ?? 'mdi-connection')}}</v-icon>&nbsp;{{text}}
        </v-chip>
    </v-slide-x-reverse-transition>
</template>

<style scoped>
.status-chip:not(:first-child) {
    margin-top: 5px;
    right: 0;
}
</style>

<script>
export default {
    computed: {
        text() {
            switch (this.status ?? undefined) {
                case true:
                    return `${this.displayedName} Online!`;
                case false:
                    return `${this.displayedName} Disconnected!`;
                default:
                    return `${this.displayedName} Status Unknown!`;
            }
        },
        colour() {
            switch (this.status) {
                case true:
                    return "success darken-1";
                case false:
                    return "error darken-1";
                default:
                    return "warning darken-1";
            }
        }
    },
    data() {
        return {
            status: undefined,
            display: true,
            dismissed: false
        }
    },
    created() {
        this.$nuxt.$on("statusUpdate", (data) => {
            if (data == undefined) return;
            if (data.name === this.queryRoom) {
                const oldStatus = this.status
                this.status = data.status;

                if (this.status !== oldStatus) {
                    this.dismissed = false;
                    this.display = true;
                }

                if (this.status === true) {
                    setTimeout(() => {
                        this.display = false;
                    }, 5000);
                }
                else {
                    this.display = true;
                }
            }
        })
    },  
    methods: {
        close() {
            this.dismissed = true;
        }
    },
    props: ["queryRoom", "displayedName", "connectedIcon", "disconnectedIcon"],
}
</script>