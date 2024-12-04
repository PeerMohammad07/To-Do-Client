import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
  userData : null
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    userLogin : (state,action)=>{
      state.userData = action.payload
    },
    userLogout : (state)=>{
      state.userData = null
    }
  }
})

export const {userLogin,userLogout} = userSlice.actions
export default userSlice.reducer