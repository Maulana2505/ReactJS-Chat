import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SearchService from "../../service/searchService";

const initialState = {
  isLoading: false,
  isError: "",
  data: null,
};
const { search } = SearchService();

export const searchThunk = createAsyncThunk(
  "search",
  async (query, thungAPI) => {
    try {
      const res = await search(query);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return thungAPI.rejectWithValue(error.response);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuerry: (state,action)=>{
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.data = null;
        state.isLoading = true;
      })
      .addCase(searchThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("ini dari payload :" + action.payload)
        state.data = action.payload;
      })
      .addCase(searchThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const { setQuerry } = searchSlice.actions;
export default searchSlice.reducer;
