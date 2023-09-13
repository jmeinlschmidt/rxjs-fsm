import { Observable, scan, shareReplay, startWith } from 'rxjs';

import { INextStateFn, IStateStore, Input, State } from '../models';

export const rxjsStore = <S extends State, T extends Input>(initialState: S): IStateStore<S, T> => (
  input$: Observable<T>,
  nextStateFn: INextStateFn<S, T>,
) => {
  return input$.pipe(
    scan(nextStateFn, initialState),
    startWith(initialState),
    shareReplay(1)
  );
};
