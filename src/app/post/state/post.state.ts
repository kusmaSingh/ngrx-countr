import { Post } from "../../model/post"

export interface PostsState{
  posts :Post[]

}

export const initialState: PostsState = {
  posts : [
    {id : '1', title : " Sample data 1", description : 'Sample desciption 1'},
    {id : '2', title : " Sample data 2", description : 'Sample desciption 2'},

  ]
}
