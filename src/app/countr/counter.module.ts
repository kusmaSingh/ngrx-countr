import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.action';

const routes: Routes = [{ path: '', component: CounterComponent }];

@NgModule({
  imports: [CommonModule, FormsModule,RouterModule.forChild(routes), StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)],
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
  ],
})
export class CounterModule {}
