import { Observable } from 'rxjs';

export type Input = string | number;
export type State = string | number;

export type StateTransition<S extends State, T extends Input> = Record<T, S>;
export type StateTransitions<S extends State, T extends Input> = Record<S, StateTransition<S, T>>;

export type INextStateFn<S extends State, T extends Input> = (state: S, input: T) => S;
export type IStateStore<S extends State, T extends Input> =
  (input: Observable<T>, nextStateFn: INextStateFn<S, T>) => Observable<S>;
