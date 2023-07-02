import { Input, State, StateTransitions } from './models';
import { markInput } from './mark-input';
import { nextState } from './next';

// These are helper functions, independent of state machine instance.
export const stateMachineFactory = <S extends State, T extends Input>(transitions: StateTransitions<S, T>) => ({
  markInput,
  nextState: nextState<S, T>(transitions),
});
