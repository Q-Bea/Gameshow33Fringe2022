export const state = () => ({
    inUse: []
})

export const mutations = {
    set(state, data) {
        if (Array.isArray(data)) {
            state.inUse = data;
        }
    }
}