import {createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: "",
  onlineUser: [],
};


const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});
export const { setOnlineUser,setSocket } = socketSlice.actions;
export default socketSlice.reducer;
