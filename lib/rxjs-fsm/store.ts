import { Observable, map, scan, shareReplay, tap, withLatestFrom } from 'rxjs';

import { Input, State } from './models';
import { INextStateFn } from './next';

export interface IStateStore<S extends State, T extends Input> {
  (input: Observable<T>, nextStateFn: INextStateFn<S, T>): Observable<S>
}

export const rxjsStore = <S extends State, T extends Input>(initialState: S): IStateStore<S, T> => (
  input$: Observable<T>,
  nextStateFn: INextStateFn<S, T>,
) => {
  return input$.pipe(
    scan(nextStateFn, initialState),
    shareReplay(1),
  );
};

export const externalStore = <S extends State, T extends Input>(
  stateProp$: Observable<S>,
  updateStateProp: (value: S) => void,
): IStateStore<S, T> => (
  input$: Observable<T>,
  nextStateFn: INextStateFn<S, T>,
) => {
  return input$.pipe(
    withLatestFrom(stateProp$),
    map(([input, oldState]) => nextStateFn(oldState, input)),
    tap((newState) => updateStateProp(newState)),
    shareReplay(1),
  );
};
