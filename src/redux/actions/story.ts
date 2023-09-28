import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGenStory, IServerResponse, IStory } from '../../Types'
import { generateStoryApi, getAllStoriesApi } from '../../Api'

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