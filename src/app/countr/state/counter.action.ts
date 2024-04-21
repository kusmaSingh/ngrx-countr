import { createAction, props } from '@ngrx/store';

export const COUNTER_STATE_NAME = 'counter'
export const COUNTER_INCREMENT = 'increment'
export const COUNTER_DECREMENT = 'decrement'
export const COUNTER_RESET = 'reset'


export const increment = createAction(COUNTER_INCREMENT);
export const decrement = createAction(COUNTER_DECREMENT);
export const reset = createAction(COUNTER_RESET);
export const customIncrement = createAction(
  'customincrement',
  props<{ count: number }>()
);

export const changeChannelName = createAction('changeChannelName')
