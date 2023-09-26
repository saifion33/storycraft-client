import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Types";

interface IState{
    loading: boolean
    user:IUser|null
    error:string | null
}

const storedUser=localStorage.getItem("user");

const initialState: IState = {
    error:null,
    loading:false,
    user:storedUser?JSON.parse(storedUser):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer