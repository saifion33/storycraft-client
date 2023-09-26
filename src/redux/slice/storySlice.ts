import {createSlice} from '@reduxjs/toolkit'
import { IStory } from '../../Types'

interface IState{
    loading: boolean,
    stories:IStory[]|null,
    error:string|null
}

const initialState:IState ={
    loading:false,
    stories:null,
    error:null
}
const storySlice=createSlice({
    name:'story',
    initialState,
    reducers:{}
})

export default storySlice.reducer