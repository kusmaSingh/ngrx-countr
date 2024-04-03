import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../state/counter.action';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.css',
})
export class CounterButtonsComponent {
  // commented code for: without Ngrx code for counter
  // @Output() increment = new EventEmitter();
  // @Output() decrement = new EventEmitter();
  // @Output() reset = new EventEmitter();

  // onIncrement() {
  //   this.increment.emit();
  // }
  // onDecrement() {
  //   this.decrement.emit();
  // }

  // onReset() {
  //   this.reset.emit();
  // }

  constructor(private store: Store <{counter: {counter: number}}>){
  }

   onIncrement() {
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }

}
