import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { getPosts } from '../state/posts.selector';
import { deletePost, loadPosts } from '../state/post.action';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.css'
})
export class PostlistComponent implements OnInit {

  posts: Observable<Post[]>
  constructor(private store:Store <AppState>){

  }
  ngOnInit(){
    this.posts = this.store.select(getPosts);
    console.log('list page', this.posts);
    this.store.dispatch(loadPosts());

  }
  onDeletePost(id: string) {

    if(confirm('Are you sure you want to delete ?')){
      console.log('delete the post with id : ',id);
      this.store.dispatch(deletePost({id}))
    }
    }
}
