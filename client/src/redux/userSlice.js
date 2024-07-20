import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        name: '',
        email: '',
        profile_pic: '',
        token: ''
    },
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state, action) => {
            state._id = ''
            state.name = ''
            state.email = ''
            state.profile_pic = ''
            state.token = ''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser , setToken , logout } = userSlice.actions

export default userSlice.reducer