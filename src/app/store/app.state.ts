
import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState{
[SHARED_STATE_NAME] : SharedState;
[AUTH_STATE_NAME]: AuthState;
router: RouterReducerState
}

export const appReducers={
[SHARED_STATE_NAME] : sharedReducer,
[AUTH_STATE_NAME] : AuthReducer,
router: routerReducer

}
