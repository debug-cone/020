import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        loggedUserAction: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        restoreUserAction: (state,action) => {
            state.user = action.payload
        },
        logoutUserAction: (state, action) => {
            state.user = {}
            localStorage.removeItem('user')
        }
    }
})

export const { loggedUserAction, restoreUserAction, logoutUserAction } = userSlice.actions;
export default userSlice.reducer