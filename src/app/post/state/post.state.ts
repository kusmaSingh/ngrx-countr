import { Post } from '../../model/post';

export interface PostsState {
  posts: Post[];
  redirect?: boolean;
}

export const initialState: PostsState = {
  posts: null,
  redirect: false
};
