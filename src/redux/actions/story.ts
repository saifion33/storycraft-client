import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGenStory, ISaveStory, IServerResponse, IStory } from '../../Types'
import { deleteStoryApi, generateStoryApi, getAllStoriesApi, saveStoryApi } from '../../Api'

interface IResponse extends IServerResponse {
    story: IStory
}
interface IAllResponse extends IServerResponse{
    stories:IStory[]
}


// *********************************************** GET ALL STORIES **************************************************************
export const getAllStories = createAsyncThunk<IAllResponse, void, { rejectValue: IServerResponse }>('/story/all', async (__, thunkApi) => {
    try {
        const response = await getAllStoriesApi()
        return response.data
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

// *********************************************** GENERATE STORY **************************************************************
export const generateStory = createAsyncThunk<IResponse, IGenStory, { rejectValue: IServerResponse }>('/story/generate', async (payload, thunkApi) => {
    try {
        const response = await generateStoryApi(payload)
        return response.data
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

//************************************************** SAVE STORY ****************************************************************
export const saveStory = createAsyncThunk<IServerResponse, ISaveStory, { rejectValue: IServerResponse }>('/story/save', async (payload, thunkApi) => {
    try {
        const response = await saveStoryApi(payload)
        return response.data
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})
export const deleteStory = createAsyncThunk<IServerResponse,{storyId:string}, { rejectValue: IServerResponse }>('/story/delete', async (payload, thunkApi) => {
    try {
        const response = await deleteStoryApi(payload.storyId)
        return response.data
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse }}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})


