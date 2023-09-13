import { BehaviorSubject } from 'rxjs';
import { rxjsStore } from './rxjs-store';
import { TestScheduler } from 'rxjs/testing';

import { INextStateFn } from '../models';
import { externalStore } from './external-store';

type State = 'A' | 'B';
type Input = 'X' | 'Y';

const initialState: State = 'A';
const nextStateFn: INextStateFn<State, Input> = (state, input) => {
  if (state === 'A' && input === 'X') return 'B';
  if (state === 'B' && input === 'Y') return 'A';
  return state;
};

describe('rxjsStore', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should return an observable with the correct state transitions', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const inputSeq = '              -X-Y-Y-X';
      const expected = `${initialState}B-A-A-B`;

      const input$ = hot<Input>(inputSeq);
      const stateStore = rxjsStore<State, Input>(initialState);
      const state$ = stateStore(input$, nextStateFn);
  
      expectObservable(state$).toBe(expected);
    });
  });
});

describe('externalStore', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should update the state property with the correct state transitions', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const inputSeq = '              -X-Y-Y-X';
      const expected = `${initialState}B-A-A-B`;

      const input$ = hot<Input>(inputSeq);
      const stateProp$ = new BehaviorSubject<State>(initialState);
      const updateStateProp = (value: State) => stateProp$.next(value);

      const stateStore = externalStore<State, Input>(stateProp$, updateStateProp);
      const state$ = stateStore(input$, nextStateFn);

      expectObservable(state$).toBe(expected);
    });
  });
});
