import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../model/post';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/posts.selector';
import { Subscription, take } from 'rxjs';
import { updatePost } from '../state/post.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  post: Post;
  postFormSubscription: Subscription;
  constructor(private store: Store<AppState>) {
    this.createForm();
    this.postFormSubscription = this.store
      .select(getPostById)
      .subscribe((post) => {
        if (post) {
          this.post = post;
          this.postForm.patchValue({
            title: post.title,
            description: post.description,
          });
        }
      });
  }

  ngOnInit() {}

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onUpdatePost() {
    if (this.postForm.invalid) {
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    this.store.dispatch(updatePost({ post }));
    //this.router.navigate(['posts']);
  }

  showDescriptionError() {
    const descriptionFormObj = this.postForm.get('description');
    if (descriptionFormObj.touched && !descriptionFormObj.valid) {
      if (descriptionFormObj.errors['required']) {
        return 'Description is required';
      }
      if (descriptionFormObj.errors['minlength']) {
        return 'Description should be minimum 10 characters';
      }
    }
    return '';
  }

  showTitleError() {
    const titleFormObj = this.postForm.get('title');
    if (titleFormObj.touched && !titleFormObj.valid) {
      if (titleFormObj.errors['required']) {
        return 'Title is required';
      }
      if (titleFormObj.errors['minlength']) {
        return 'Title should be minimum 8 characters';
      }
    }
    return '';
  }

  ngOnDestroy() {
    if (this.postFormSubscription) {
      this.postFormSubscription.unsubscribe();
    }
  }
}
