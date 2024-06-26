import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostlistComponent } from './postlist/postlist.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { postsReducer } from './state/post.reducer';
import { StoreModule } from '@ngrx/store';
import { POST_STATE_NAME } from './state/post.action';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './state/posts.effects';
import { PostSService } from '../services/posts.service';

const routes: Routes = [
  {
    path: '',
    component: PostlistComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffect])

  ],
  declarations: [PostlistComponent, AddPostComponent, EditPostComponent],
})
export class PostsModule {}
