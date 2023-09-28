import axios from "axios";
import { IGenStory, ILoginForm, ISignupForm } from "../Types";

export const baseURL = "http://192.168.43.224:5000"

const api = axios.create({
    baseURL
})

api.interceptors.request.use(value => {
    const methods = ['post', 'patch', 'delete']
    const storedToken = localStorage.getItem('token')
    const token = storedToken && JSON.parse(storedToken)

    if (value.method && token) {
        if (methods.includes(value.method) && !(value.url === '/auth/signup' || value.url === '/auth/login')) {
            value.headers.Authorization='Bearer ' + token
        }
    }
    return value
})

export const signupApi = (authData: ISignupForm) => api.post('/auth/signup', authData)
export const loginApi = (authData: ILoginForm) => api.post('/auth/login', authData)

export const generateStoryApi = (data: IGenStory) => api.post('/story/generate', data)