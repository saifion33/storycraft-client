import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISaveStory, IUser } from "../../Types";
import { login, signup } from "../actions/auth";

interface IState {
    loading: boolean
    user: IUser | null
    error: string | null
    token: string | null
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: IState = {
    error: null,
    loading: false,
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? JSON.parse(storedToken) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        updateSaveStory: (state, action: PayloadAction<ISaveStory>) => {
            if (state.user) {
                const savedStories = state.user.savedStories;
                const storyId = action.payload.storyId;
                if (savedStories.includes(storyId)) {
                    state.user.savedStories = savedStories.filter(id => id !== storyId)
                } else {
                    state.user.savedStories.push(storyId)
                }
                localStorage.setItem('user',JSON.stringify(state.user))
            }
        }
    },
    extraReducers: builder => {

        // ************************* SIGNUP ************************
        builder.addCase(signup.pending, (state => {
            state.loading = true;
            state.error = null;
        }))
        builder.addCase(signup.fulfilled, (state, action) => {
            const user = action.payload.user;
            const token = action.payload.token;

            state.loading = false;
            state.user = user
            state.token = token
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Something went wrong."
        })
        // *********************************** LOGIN ********************************
        builder.addCase(login.pending, (state => {
            state.loading = true;
            state.error = null;
        }))
        builder.addCase(login.fulfilled, (state, action) => {
            const token = action.payload.token
            const user = action.payload.user
            state.loading = false;
            state.token = token
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Something went wrong."
        })
    }
})

export const { logout,updateSaveStory } = authSlice.actions

export default authSlice.reducer