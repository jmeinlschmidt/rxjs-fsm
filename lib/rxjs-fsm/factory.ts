import { Input, State, StateTransitions } from './models';
import markInput from './mark-input';
import nextState from './next';

export const stateMachineFactory = <S extends State, T extends Input>(transitions: StateTransitions<S, T>) => ({
  markInput,
  nextState: nextState<S, T>(transitions),
});
