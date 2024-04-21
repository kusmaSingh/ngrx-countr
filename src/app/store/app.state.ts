import { counterReducer } from "../countr/state/counter.reducer";
import { CounterState } from "../countr/state/counter.state";
import { postsReducer } from "../post/state/post.reducer";
import { PostsState } from "../post/state/post.state";

export interface AppState{
counter : CounterState;
posts: PostsState
}

export const appReducers={
counter :counterReducer,
posts : postsReducer
}
