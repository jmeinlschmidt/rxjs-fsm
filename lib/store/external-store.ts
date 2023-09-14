import { Observable, concat, map, shareReplay, take, tap, withLatestFrom } from 'rxjs';

import { INextStateFn, IStateStore, BaseInput, BaseState } from '../models';

export const externalStore = <S extends BaseState, T extends BaseInput>(
  stateProp$: Observable<S>,
  updateStateProp: (value: S) => void,
): IStateStore<S, T> => (
  input$: Observable<T>,
  nextStateFn: INextStateFn<S, T>,
) => {
  const initialState$ = stateProp$.pipe(take(1));
  const nextState$ = input$.pipe(
    withLatestFrom(stateProp$),
    map(([input, oldState]) => nextStateFn(oldState, input)),
    tap((newState) => updateStateProp(newState)),
  );

  return concat(initialState$, nextState$).pipe(
    shareReplay(1),
  );
};
