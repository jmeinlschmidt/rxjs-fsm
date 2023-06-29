import { Observable, filter, scan, shareReplay } from 'rxjs';

import { Input, State, StateTransitions } from './models';
import nextState from './next';

export class StateMachine<S extends State, T extends Input> {
  private _state$: Observable<S>;

  public get state$(): Observable<S> {
    return this._state$.pipe(shareReplay(1));
  }

  constructor(
    private _input$: Observable<T>, 
    private _transitions: StateTransitions<S, T>,
    initialState: S,
  ) {
    const nextStateFn = nextState<S, T>(this._transitions);

    this._state$ = this._input$.pipe(
      scan(nextStateFn, initialState),
    );
  }

  public selectState(state: S): Observable<S> {
    return this.state$.pipe(filter((value) => value === state));
  }
}
