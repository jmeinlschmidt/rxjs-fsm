import { Observable, of, take } from 'rxjs';
import { createRxJsFsm, StateMachine } from './create';
import { rxjsStore } from './store';
import { StateTransitions } from './models';
import { TestScheduler } from 'rxjs/testing';

type State = 'A' | 'B';
type Input = 'X' | 'Y';

const initialState: State = 'A';
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
const input$ = of('X', 'Y', 'Y', 'X') as Observable<Input>;

describe('createRxJsFsm', () => {
  test('should create a StateMachine instance with the correct initial state', () => {
    const stateMachine = createRxJsFsm(transitions, input$, initialState);

    expect(stateMachine).toBeInstanceOf(StateMachine);
    stateMachine.selectState()
      .pipe(take(1))
      .subscribe((state) => expect(state).toEqual(initialState));
  });
});

describe('StateMachine', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should select the correct state', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const input$ = hot<Input>('X-Y-Y-X');
  
      const store = rxjsStore<State, Input>(initialState);
      const stateMachine = new StateMachine(transitions, input$, store);
  
      const selectedStateA$ = stateMachine.selectState('A');
      const selectedStateB$ = stateMachine.selectState('B');

      expectObservable(selectedStateA$).toBe('A-----A');
      expectObservable(selectedStateB$).toBe('B-B-B');
    });
  });
});