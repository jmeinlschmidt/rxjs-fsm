import { Observable, scan, shareReplay, startWith } from 'rxjs';

import { INextStateFn, IStateStore, BaseInput, BaseState } from '../models';

export const rxjsStore = <S extends BaseState, T extends BaseInput>(initialState: S): IStateStore<S, T> => (
  input$: Observable<T>,
  nextStateFn: INextStateFn<S, T>,
) => {
  return input$.pipe(
    scan(nextStateFn, initialState),
    startWith(initialState),
    shareReplay(1)
  );
};
