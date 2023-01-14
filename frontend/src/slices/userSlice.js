import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";

const initialState = {
  AIResponses: [],
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setAIResponses(state, action){
            let newAIResponses = action.payload;
            const oldAIResponses = state.AIResponses;
            let newAIResponsesArray = [...oldAIResponses, newAIResponses];
            state.AIResponses = newAIResponsesArray;
        },

        addAIResponse(state, action) {
            state.AIResponses.push(action.payload);
        },

        removeAIResponses (state, action) {
            if (state.AIResponses.length === 0) {
                console.error('No AIResponses to delete.');
                return;
            } else {
                state.AIResponses = [];
            }
        }
    },
    extraReducers: (builder) => {
            builder.addCase(addAIResponse.fulfilled, (state, action) => {
            return {...state, AIResponse: action.payload}
        });
    },
});

export default userSlice.reducer;
export const { addAIResponse } = userSlice.actions;