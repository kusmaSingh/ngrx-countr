import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { addPost } from '../state/post.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Post } from '../../model/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  post: Post;

  constructor( private store :Store<{AppState}>, private router : Router){

  }

  ngOnInit() {
    this.postForm = new FormGroup({
      title:  new FormControl(null, [Validators.required, Validators.minLength(8)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onAddPost(){
    if( this.postForm.invalid){
      return ;
    }
    const title = this.postForm.value.title;
    const  description = this.postForm.value.description
    const post :Post = {
      id : undefined
      ,
      title,
      description
    }
    this.store.dispatch(addPost({post}))
    this.router.navigate(['posts'])
  }

  showDescriptionError(){
    const descriptionFormObj = this.postForm.get('description');
    if(descriptionFormObj.touched && ! descriptionFormObj.valid){
      if( descriptionFormObj.errors['required'] ){
        return 'Description is required'
      }
      if(descriptionFormObj.errors['minlength']){
       return "Description should be minimum 10 characters"
      }
    }
    return '';
  }
  showTitleError(){
    const titleFormObj = this.postForm.get('title');
    if(titleFormObj.touched && ! titleFormObj.valid){
      if( titleFormObj.errors['required'] ){
        return 'Title is required'
      }
      if(titleFormObj.errors['minlength']){
       return "Title should be minimum 8 characters"
      }
    }

    return false;
  }
}
