
import { createSlice } from '@reduxjs/toolkit';
interface ScreenState {
        feedSearchScreenStatus: boolean;
}

const initialState: ScreenState = { feedSearchScreenStatus: false };
const screenSlice = createSlice({
        name: 'screen',
        initialState,
        reducers: {
                updateFeedSearchScreenStatus: (state, actions) => {
                        state.feedSearchScreenStatus = actions.payload.feedSearchScreenStatus;
                },
        },
});

export const { updateFeedSearchScreenStatus } = screenSlice.actions;

export default screenSlice.reducer;
export const selectFeedSearchScreenStatus = (state: any) => (state.screen.feedSearchScreenStatus)


