import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom.serializer';

const getPostState = createFeatureSelector<PostsState>('posts');

export const getPosts: any = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts:any, route: RouterStateUrl) => {
    return posts ? posts.find((post) => post.id === route.params['id']) : null;
  }
);
