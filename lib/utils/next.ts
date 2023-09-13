import { Input, State, StateTransitions } from '../models';

export const nextState = <S extends State, T extends Input>(
  transitions: StateTransitions<S, T>,
) => (state: S, input: T): S => transitions[state][input];
