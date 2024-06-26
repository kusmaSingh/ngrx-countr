import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.action';
import { getChannelName } from '../state/counter.selector';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.css'
})
export class CustomCounterInputComponent implements OnInit {
  value!: number ;
 channelName : string;
  constructor(private store : Store<AppState>){
  }

  ngOnInit() {
 this.store.select(getChannelName).subscribe(channelName=>{
  console.log('Channel Name is called');
  this.channelName  = channelName;
 })
  }
  onAdd(){
    console.log(this.value)
    this.store.dispatch(customIncrement({count : this.value}));
  }
  onChangeChannelName(){
    this.store.dispatch(changeChannelName())
  }

}

