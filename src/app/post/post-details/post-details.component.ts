import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
post:Observable<Post>;

constructor( private store: Store<AppState>){

}

ngOnInit(){
  this.post = this.store.select(getPostById)
}

}
