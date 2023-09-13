import { Observable, filter } from 'rxjs';

import { State, Input, StateTransitions, IStateStore } from '../models';
import { nextState } from '../utils';

export class StateMachine<S extends State, T extends Input> {
  private _state$: Observable<S>;

  constructor(
    transitions: StateTransitions<S, T>,
    input$: Observable<T>,
    store: IStateStore<S, T>,
  ) {
    this._state$ = store(input$, nextState<S, T>(transitions));
  }

  public selectState(state?: S): Observable<S> {
    // Select all states
    if (!state) {
      return this._state$;
    }

    // Select only specific state
    return this._state$.pipe(filter((value) => value === state));
  }
}
