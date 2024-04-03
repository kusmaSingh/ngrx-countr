import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counter: number = 0;
  ngOnInit():void {}
  constructor() {}
  // onIncrement() {
  //   this.counter++;

  // }
  // onDecrement() {
  //   this.counter--;

  // }
  // onReset() {
  //   this.counter = 0;
  // }
}
