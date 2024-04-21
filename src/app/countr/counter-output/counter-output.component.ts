import { getCounter } from '../state/counter.selector';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../state/counter.state';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent implements OnInit , OnDestroy  {
  // @Input() counter: any;   // without Ngrx code for counter
  counter!: number;
  counter$!: Observable<{counter:number}>  ;
  counterSubscription!: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
   this.store.select(getCounter).subscribe((counter) => {
    console.log('COunter Obserable is calling')
      this.counter = counter;
    });
//this.counter$ = this.store.select('counter') ;
  }

  ngOnDestroy(){
    // if(this.counterSubscription){
    //     this.counterSubscription.unsubscribe();
    // }
  }
}
