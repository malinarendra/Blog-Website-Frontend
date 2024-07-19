import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: false,
        data: {}
    },
    reducers: {
        // reducer to set set login state true or false
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        // reducer to set user data
        setUserData: (state, action) => {
            state.data = action.payload;
        }
    }
})

// importing reducers
export default userSlice.reducer
//importing actions
export const{setLogin, setUserData}=userSlice.actions// this need when we will use dispatch or useSelector