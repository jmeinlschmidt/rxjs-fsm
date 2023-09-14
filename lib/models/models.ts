import { Observable } from 'rxjs';

export type BaseInput = string | number;
export type BaseState = string | number;

export type StateTransition<S extends BaseState, T extends BaseInput> = Record<T, S>;
export type StateTransitions<S extends BaseState, T extends BaseInput> = Record<S, StateTransition<S, T>>;

export type INextStateFn<S extends BaseState, T extends BaseInput> = (state: S, input: T) => S;
export type IStateStore<S extends BaseState, T extends BaseInput> =
  (input: Observable<T>, nextStateFn: INextStateFn<S, T>) => Observable<S>;
