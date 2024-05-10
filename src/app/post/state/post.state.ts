import { Post } from '../../model/post';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: null
};
