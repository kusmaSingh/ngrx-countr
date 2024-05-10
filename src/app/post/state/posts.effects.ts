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
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { PostSService } from '../../services/posts.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostSService,
    private router: Router
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
            console.log(data);
            const post = { ...action.post, id: data.name };
            this.router.navigate(['/posts']);
            // this.store
            return addPostSuccess({ post });
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
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action)=>{
        return this.postsService.deletePost(action.id).pipe(
          map(data =>{
            return deletePostSuccess({ id : action.id})
          })
        )
      })

    )
  })
}

