export const state = () => ({
    options: []
})

export const mutations = {
    setOptions(state, data) {
        state.options = data;
    }
}