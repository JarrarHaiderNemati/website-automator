import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  siteBeingCreated: boolean
}

const initialState: UIState = {
  siteBeingCreated:false
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSiteBeingCreated: (state, action: PayloadAction<boolean>) => {
      state.siteBeingCreated = action.payload;
    },
  },
});

export const { setSiteBeingCreated } = projectSlice.actions;
export default projectSlice.reducer;
