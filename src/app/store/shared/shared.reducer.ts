import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
   // console.log(state)
    return {...state, showLoading: action.status }
  }),
  on(setErrorMessage, (state, action)=>{
    return {
      ...state,
      errorMessage: action.message
    }
  })
);

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
