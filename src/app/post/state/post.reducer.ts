import { createReducer, on } from "@ngrx/store"
import { initialState } from "./post.state"
import { addPost, deletePost, updatePost } from "./post.action";

const _postsReducer = createReducer(initialState,
   on(addPost, (state, action)=> {
    let post  = {...action.post};
    post.id =     (state.posts.length +1 ).toString();
        return {
          state , posts: [...state.posts, post]

        }
   }),

   on(updatePost, (state, action)=> {
    const updatePosts = state.posts.map((post) =>{
      return action.post.id === post.id? action.post : post;
    });
    return {
      ...state,
      posts : updatePosts
    }
   }),
   on(deletePost, (state, {id})=>{
    const updatePost = state.posts.filter((post)=>{
      return post.id !== id;
   })
   return {
    ...state, posts: updatePost
   }
   })
  );



export function postsReducer(state, action){
  return _postsReducer(state, action)
}

