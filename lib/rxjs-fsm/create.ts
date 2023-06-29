import { Observable, filter } from 'rxjs';

import { Input, State, StateTransitions } from './models';
import { nextState } from './next';
import { rxjsStore, IStateStore } from './store';

export const createRxJsFsm = <S extends State, T extends Input>(
  transitions: StateTransitions<S, T>,
  input$: Observable<T>,
  initialState: S,
) => new StateMachine(transitions, input$, rxjsStore(initialState));

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
    if (!state) {
      return this._state$;
    }

    return this._state$.pipe(filter((value) => value === state));
  }
}
