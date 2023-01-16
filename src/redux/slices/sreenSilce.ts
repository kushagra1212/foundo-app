
import { createSlice } from '@reduxjs/toolkit';
interface ScreenState {
        feedSearchScreenStatus: boolean;
        addItemDetailsScreenStatus: boolean;
}

const initialState: ScreenState = { feedSearchScreenStatus: false, addItemDetailsScreenStatus: false };
const screenSlice = createSlice({
        name: 'screen',
        initialState,
        reducers: {
                updateFeedSearchScreenStatus: (state, actions) => {
                        state.feedSearchScreenStatus = actions.payload.feedSearchScreenStatus;
                },
                updateAddItemDetailsScreenStatus: (state, actions) => {
                        state.addItemDetailsScreenStatus = actions.payload.addItemDetailsScreenStatus;
                }
        },
});

export const { updateFeedSearchScreenStatus, updateAddItemDetailsScreenStatus } = screenSlice.actions;

export default screenSlice.reducer;
export const selectFeedSearchScreenStatus = (state: any) => (state.screen.feedSearchScreenStatus)
export const selectAddItemDetailsScreenStatus = (state: any) => (state.screen.addItemDetailsScreenStatus)


