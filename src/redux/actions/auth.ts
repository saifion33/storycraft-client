import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginForm, IServerResponse, ISignupForm, IUser } from "../../Types";
import { loginApi, signupApi } from "../../Api";

interface IResponse extends IServerResponse{
    token:string
    user:IUser
}

export const signup=createAsyncThunk<IResponse,ISignupForm,{rejectValue:IServerResponse}>('signup',async(payload,thunkApi)=>{
    try {
        const response=await signupApi(payload)
        return response.data
    } catch (error) {
        const errorMessage = error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
});

export const login=createAsyncThunk<IResponse,ILoginForm,{rejectValue:IServerResponse}>('login',async (payload,thunkApi) => {
    try {
        const response=await loginApi(payload)
        return response.data
    } catch (error) {
        const errorMessage = error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})