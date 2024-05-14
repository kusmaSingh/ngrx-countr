import { Store } from '@ngrx/store';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
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
import { exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { PostSService } from '../../services/posts.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setLoadingSpinner } from '../../store/shared/shared.actions';
import { AppState } from '../../store/app.state';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostSService,
    private router: Router,
    private store :Store<AppState>,
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
            debugger;
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const post = { ...action.post, id: data.name };
            // this.router.navigate(['/posts']);
            // this.store
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

  postRedirected$ = createEffect(() => {
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
}
