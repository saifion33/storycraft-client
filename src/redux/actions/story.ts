import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGenStory, IServerResponse, IStory } from '../../Types'
import { generateStoryApi } from '../../Api'

interface IResponse extends IServerResponse {
    story: IStory
}

export const generateStory = createAsyncThunk<IResponse, IGenStory, { rejectValue: IServerResponse }>('generateStory', async (payload, thunkApi) => {
    try {
        const response = await generateStoryApi(payload)
        return response.data
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})