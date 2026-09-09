import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,

  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },

    deletePlatform: (state, action) => {
      state.platforms = state.platforms.filter(
        (platform) => platform.id !== action.payload
      );
    },

    editPlatform: (state, action) => {
      const { id, name } = action.payload;

      const platform = state.platforms.find(
        (platform) => platform.id === id
      );

      if (platform) {
        platform.name = name;
      }
    },
  },
});

export const {
  addPlatform,
  deletePlatform,
  editPlatform,
} = platformSlice.actions;

export default platformSlice.reducer;