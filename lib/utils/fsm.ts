import { pipe, scan, startWith } from 'rxjs';
import { BaseInput, BaseState, StateTransitions } from '../models';
import { nextState } from './next';

export const fsm = <S extends BaseState, T extends BaseInput>(
  transitions: StateTransitions<S, T>,
) => (
  initialState: S,
) => pipe(
  scan(nextState<S, T>(transitions), initialState),
  startWith(initialState),
);
