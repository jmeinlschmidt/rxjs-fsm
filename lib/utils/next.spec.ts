import { INextStateFn, StateTransitions } from '../models';

import { nextState } from './next';

type State = 'A' | 'B';
type Input = 'X' | 'Y';

const transitions: StateTransitions<State, Input> = {
  A: {
    X: 'B',
    Y: 'A',
  },
  B: {
    X: 'A',
    Y: 'B',
  },
};

describe('nextState', () => {
  test('should return the next state based on the input', () => {
    const getNextState: INextStateFn<State, Input> = nextState(transitions);

    expect(getNextState('A', 'X')).toBe('B');
    expect(getNextState('A', 'Y')).toBe('A');
    expect(getNextState('B', 'X')).toBe('A');
    expect(getNextState('B', 'Y')).toBe('B');
  });
});
