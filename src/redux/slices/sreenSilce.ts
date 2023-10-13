import { createSlice } from '@reduxjs/toolkit';
interface ScreenState {
  feedSearchScreenStatus: boolean;
  addItemDetailsScreenStatus: boolean;
  chatScreenStatus: boolean;
}

const initialState: ScreenState = {
  feedSearchScreenStatus: false,
  addItemDetailsScreenStatus: false,
  chatScreenStatus: false,
};
const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    updateFeedSearchScreenStatus: (state, actions) => {
      state.feedSearchScreenStatus = actions.payload.feedSearchScreenStatus;
    },
    updateAddItemDetailsScreenStatus: (state, actions) => {
      state.addItemDetailsScreenStatus =
        actions.payload.addItemDetailsScreenStatus;
    },
    updateChatScreenStatus: (state, actions) => {
      state.chatScreenStatus = actions.payload.chatScreenStatus;
    },
  },
});

export const {
  updateFeedSearchScreenStatus,
  updateAddItemDetailsScreenStatus,
  updateChatScreenStatus,
} = screenSlice.actions;

export default screenSlice.reducer;
export const selectFeedSearchScreenStatus = (state: any) =>
  state.screen.feedSearchScreenStatus;
export const selectAddItemDetailsScreenStatus = (state: any) =>
  state.screen.addItemDetailsScreenStatus;
export const selectChatScreenStatus = (state: any) =>
  state.screen.chatScreenStatus;
