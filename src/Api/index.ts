import axios from "axios";
import { ILoginForm, ISignupForm } from "../Types";

export const baseURL = "http://192.168.43.224:5000"

const api=axios.create({
    baseURL
})

export const signupApi=(authData:ISignupForm)=>api.post('/auth/signup',authData)
export const loginApi=(authData:ILoginForm)=>api.post('/auth/login',authData)