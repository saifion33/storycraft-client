import {createSlice} from '@reduxjs/toolkit'
import { IStory } from '../../Types'
import { generateStory } from '../actions/story'

interface IState{
    loading: boolean,
    isGenerating: boolean,
    stories:IStory[]|null,
    savedStories:IStory[]|null
    error:string|null
}

const initialState:IState ={
    loading:false,
    isGenerating:false,
    stories:null,
    savedStories:null,
    error:null
}
const storySlice=createSlice({
    name:'story',
    initialState,
    reducers:{},
    extraReducers:(builder=>{
        builder.addCase(generateStory.pending,(state)=>{
            state.isGenerating=true;
            state.error=null;
        })
        builder.addCase(generateStory.fulfilled,(state,action)=>{
            state.isGenerating=false;
            if (state.stories) {
                state.stories.push(action.payload.story)
            }else{
                state.stories=[action.payload.story]
            }
        })
        builder.addCase(generateStory.rejected,(state,action)=>{
            state.isGenerating=false;
            state.error=action.payload?.message || 'Something went wrong.'
        })
    })
})

export default storySlice.reducer