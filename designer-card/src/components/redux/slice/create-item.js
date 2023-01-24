import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const createItem = createAsyncThunk(
  "createItem",
  async (object, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: object.title,
          body: object.body,
          userId: Math.floor(Math.random() * 10),
        }
      );
      return [...getState().item1.data, data];
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const fetchItems = createAsyncThunk(
  "fetchItems",
  async (object, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data.slice(0, 10);
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const createItemSlice = createSlice({
  name: "item1",
  initialState: {
    isLoading: false,
    data: null,
    isSuccess: false,
    message: "",
  },
  reducers: {
    createItem(state, action) {
      state.push(action.payload);
    },
    fetchItems(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [createItem.pending]: (state, action) => {
      state.loading = true;
    },
    [createItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [createItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [fetchItems.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [fetchItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default createItemSlice.reducer;
