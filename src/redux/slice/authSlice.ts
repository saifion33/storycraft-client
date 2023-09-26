import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Types";
import { signup } from "../actions/auth";

interface IState{
    loading: boolean
    user:IUser|null
    error:string | null
    token:string | null
}

const storedUser=localStorage.getItem("user");
const storedToken=localStorage.getItem("token");

const initialState: IState = {
    error:null,
    loading:false,
    user:storedUser?JSON.parse(storedUser):null,
    token:storedToken?JSON.parse(storedToken):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(signup.pending,(state=>{
            state.loading=true;
            state.error=null;
        }))
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading=false;
            const user=action.payload.user;
            const token=action.payload.token;
            state.user=user
            state.token=token
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('token',JSON.stringify(token))
        })
        builder.addCase(signup.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Something went wrong."
        })
    }
})

export default authSlice.reducer