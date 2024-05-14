import { createReducer, on } from "@ngrx/store"
import { initialState } from "./post.state"
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.action";

const _postsReducer = createReducer(initialState,
   on(addPostSuccess, (state, action)=> { debugger
    let post  = {...action.post};
        return {
          ...state ,
           posts: [...state.posts, post]

        }
   }),

   on(updatePostSuccess, (state, action)=> {
    const updatePosts = state.posts.map((post) =>{
      return action.post.id === post.id? action.post : post;
    });
    return {
      ...state,
      posts : updatePosts
    }
   }),
   on(deletePostSuccess, (state, {id})=>{
    const updatePost = state.posts.filter((post)=>{
      return post.id !== id;
   })
   return {
    ...state, posts: updatePost
   }
   }),
   on(loadPostsSuccess, (state, action)=>{
    return {
      ...state,
      posts: action.posts
    }
   })
  );



export function postsReducer(state, action){
  return _postsReducer(state, action)
}

