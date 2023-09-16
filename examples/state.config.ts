import { StateTransitions } from '../lib';

export type Input = 'toggle' | 'hide';
export type State = 'hidden' | 'shown';

export const initialState: State = 'hidden';

export const transitions: StateTransitions<State, Input> = {
  hidden: {
    toggle: 'shown',
    hide: 'hidden',
  },
  shown: {
    toggle: 'hidden',
    hide: 'hidden',
  },
};
