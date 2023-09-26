import { createAsyncThunk } from "@reduxjs/toolkit";
import { IServerResponse, ISignupForm, IUser } from "../../Types";
import { signupApi } from "../../Api";

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