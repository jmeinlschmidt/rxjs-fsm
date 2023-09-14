import { markInput, nextState } from '../utils';
import { BaseInput, BaseState, StateTransitions } from '../models';

/**
 * Factory for helper functions, independent of state machine instance.
 */
export const fsmHelpersFactory = <S extends BaseState, T extends BaseInput>(
  transitions: StateTransitions<S, T>,
) => ({ markInput: markInput<unknown, T>(), nextState: nextState<S, T>(transitions) });
