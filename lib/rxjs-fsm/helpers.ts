import { markInput, nextState } from '../utils';
import { Input, State, StateTransitions } from '../models';

/**
 * Factory for helper functions, independent of state machine instance.
 */
export const fsmHelpersFactory = <S extends State, T extends Input>(
  transitions: StateTransitions<S, T>,
) => ({ markInput, nextState: nextState<S, T>(transitions) });
