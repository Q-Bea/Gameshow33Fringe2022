export const state = () => ({
    current: "",
    pending: ""
})

export const mutations = {
    setCurrent(state, name) {
        state.current = name;
    },

    setPending(state, name) {
        state.pending = name;
    },

    set(state, payload) {
        if (payload.current) state.current = payload.current;
        if (payload.pending) state.pending = payload.pending;
    }
}