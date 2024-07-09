import { createAction } from "@ngrx/store";

export const increment = createAction(`[counter Component] Increment`);
export const decrement = createAction(`[counter Component] Decrement`);
export const reset = createAction(`[counter Component] Reset`);