// Takhle by se mi to libilo

import { Subject, Observable, merge, scan } from 'rxjs';
import { StateTransitions, createRxJsFsm, stateMachineFactory } from '../lib';

type Input = 'toggle' | 'hide';
type State = 'hidden' | 'shown';
const transitions: StateTransitions<State, Input> = {
  hidden: {
    toggle: 'shown',
    hide: 'hidden',
  },
  shown: {
    toggle: 'hidden',
    hide: 'hidden',
  },
};

const {
  nextState,
  markInput
} = stateMachineFactory<State, Input>(transitions);

const toggle$ = new Subject<void>();
const hide$ = new Subject<void>();

const input$: Observable<Input> = merge(
  toggle$.pipe(markInput('toggle')),
  hide$.pipe(markInput('hide')),
);

const initialState: State = 'hidden';
const state$ = input$.pipe(
  scan(nextState, initialState),
);

const machine = createRxJsFsm(transitions, input$, initialState);

machine.selectState().subscribe((x) => console.log('toto', x));
machine.selectState().subscribe((x) => console.log('xxxx', x));
machine.selectState('shown').subscribe(x => console.log('my state', x));

state$.subscribe(console.log);

toggle$.next();
toggle$.next();
toggle$.next();

hide$.next();
