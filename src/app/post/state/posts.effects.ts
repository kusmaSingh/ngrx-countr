import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './post.action';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { PostSService } from '../../services/posts.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setLoadingSpinner } from '../../store/shared/shared.actions';
import { AppState } from '../../store/app.state';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostSService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            console.log(posts);
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });
  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post, redirect: true });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post, redirect: true });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  postRedirected$ = createEffect(
    () => {
      debugger;
      return this.action$.pipe(
        ofType(...[addPostSuccess, updatePostSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/posts']);
          }
        })
      );
    },
    { dispatch: false }
  );

  getPostDetailsById$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigationAction) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostsSuccess({ posts: postData });
          })
        );
      })
    );
  });
}
