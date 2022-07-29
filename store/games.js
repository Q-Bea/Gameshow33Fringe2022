export const state = () => ({
    tech: [],
    noTech: []
})

export const mutations = {
    set(state, data) {
        if (data != undefined) {
            if (Array.isArray(data.tech)) {
                state.tech = data.tech;
            }

            if (Array.isArray(data.noTech)) {
                state.noTech = data.noTech;
            }
        }
    }
}