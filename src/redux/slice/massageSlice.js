import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import massageService from "../../service/massageService";

const initialState = {
  salecteduser: [],
  user: [],
  massages: [],
};
const { getUserMassage, getMassage, sendMassage } = massageService();
export const getUserMassageThunk = createAsyncThunk(
  "massage/user",
  async () => {
    const res = await getUserMassage();
    return res.data;
  }
);

export const getMassageThunk = createAsyncThunk(
  "massage/massage",
  async (data) => {
    const res = await getMassage(data);
    return res.data;
  }
);

export const sendMassageThunk = createAsyncThunk(
  "massage/sendmassage",
  async ({ id, message }) => {
    const res = await sendMassage(id, message);
    return res.data;
  }
);

const massageSlice = createSlice({
  name: "massage",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.salecteduser = action.payload;
    },
    setMessage: (state, action) => {
      const iduser = localStorage.getItem("id");

      if (
        (action.payload.senderId === iduser &&
          action.payload.receiverId === state.salecteduser._id) ||
        (action.payload.senderId === state.salecteduser._id &&
          action.payload.receiverId === iduser)
      ) {
        console.log(" ini dari redux : " + action.payload.message        );
        // const msg = action.payload.message
        // action.payload.filter(e=>e.message === msg)
        state.massages.push(action.payload);
      }
    },
    removeAllData: (state, action) => {
      state.massages = action.payload;
      state.salecteduser = action.payload;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ! get user thunk
    builder
      .addCase(getUserMassageThunk.pending, () => {
        console.log("pending");
      })
      .addCase(getUserMassageThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserMassageThunk.rejected, (action) => {
        console.log(action.payload);
      });
    // ! get massage thunk
    builder
      .addCase(getMassageThunk.pending, () => {
        console.log("pending");
      })
      .addCase(getMassageThunk.fulfilled, (state, action) => {
        state.massages = action.payload;
      })
      .addCase(getMassageThunk.rejected, (action) => {
        console.log(action.payload);
      });

    builder
      .addCase(sendMassageThunk.pending, () => {
        console.log("pending");
      })
      .addCase(sendMassageThunk.fulfilled, (state, action) => {
        state.massages.push(action.payload);
      })
      .addCase(sendMassageThunk.rejected, (action) => {
        console.log(action.payload);
      });
  },
});

export const { setSelected, setMessage, removeAllData } = massageSlice.actions;
export default massageSlice.reducer;
