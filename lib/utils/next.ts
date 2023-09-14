import { BaseInput, BaseState, StateTransitions } from '../models';

export const nextState = <S extends BaseState, T extends BaseInput>(
  transitions: StateTransitions<S, T>,
) => (state: S, input: T): S => transitions[state][input];
