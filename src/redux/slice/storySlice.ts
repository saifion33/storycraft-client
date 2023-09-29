import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IStory } from '../../Types'
import { deleteStory, generateStory, getAllStories } from '../actions/story'

interface IState {
    loading: boolean,
    isGenerating: boolean,
    deletingStoryId: null | string
    stories: IStory[] | null,
    savedStories: IStory[] | null
    error: string | null
}

const initialState: IState = {
    loading: false,
    isGenerating: false,
    deletingStoryId: null,
    stories: null,
    savedStories: null,
    error: null

}
const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        upvote: (state, action: PayloadAction<{ storyId: string, userId: string }>) => {
            if (state.stories) {
                const storyId = action.payload.storyId
                const userId = action.payload.userId
                const story = state.stories.find(s => s._id == storyId)
                if (story?.upVotes.includes(userId)) {
                    story.upVotes = story.upVotes.filter(id => id !== userId)
                } else {
                    story?.upVotes.push(userId);
                }
            }
        }
    },
    extraReducers: (builder => {
        // ********************************* GENERATE STORY ******************************************
        builder.addCase(generateStory.pending, (state) => {
            state.isGenerating = true;
            state.error = null;
        })
        builder.addCase(generateStory.fulfilled, (state, action) => {
            state.isGenerating = false;
            if (state.stories) {
                state.stories.push(action.payload.story)
            } else {
                state.stories = [action.payload.story]
            }
        })
        builder.addCase(generateStory.rejected, (state, action) => {
            state.isGenerating = false;
            state.error = action.payload?.message || 'Something went wrong.'
        })
        // ********************************* GET ALL STORIES ******************************************
        builder.addCase(getAllStories.pending, state => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllStories.fulfilled, (state, action) => {
            state.loading = false;
            state.stories = action.payload.stories;
        })
        builder.addCase(getAllStories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong.'
        })
        // ********************************* DELETE STORY ********************************************
        builder.addCase(deleteStory.pending, (state, action) => {
            state.deletingStoryId = action.meta.arg.storyId
            state.error = null;
        })
        builder.addCase(deleteStory.fulfilled, (state, action) => {
            if (state.stories) {
                state.stories = state.stories?.filter(story => story._id != action.meta.arg.storyId)
                state.deletingStoryId=null;
            }
        })
        builder.addCase(deleteStory.rejected, (state, action) => {
            state.deletingStoryId=null;
            state.error = action.payload?.message || 'Something went wrong.'
        })
    })
})

export const { upvote } = storySlice.actions
export default storySlice.reducer