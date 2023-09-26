import { configureStore } from '@reduxjs/toolkit'
import storyReducer from './redux/slice/storySlice'
import authReducer from './redux/slice/authSlice'
export const store = configureStore({
  reducer: {
    'stories':storyReducer,
    'auth': authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch