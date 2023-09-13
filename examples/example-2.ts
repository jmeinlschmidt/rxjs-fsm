import { Observable, Subject, merge } from 'rxjs';

import { fsmHelpersFactory, rxjsFsmFactory } from '../lib';
import { Input, State, transitions } from './state.config';

/**
 * Example 2
 * Demonstrates creating a FSM by using class.
 */

// Define inputs
const toggle$ = new Subject<void>();
const hide$ = new Subject<void>();

const initialState: State = 'hidden';

const { markInput } = fsmHelpersFactory<State, Input>(transitions);

// Use helper functions
const input$ = merge(
  toggle$.pipe(markInput('toggle')),
  hide$.pipe(markInput('hide')),
);

const machine = rxjsFsmFactory(transitions, input$, initialState);

// Listen
machine.selectState().subscribe((newState) => console.log('New state:', newState));

console.log('Initial state:', initialState);
console.log('Input: toggle');
toggle$.next();
console.log('Input: toggle');
toggle$.next();
console.log('Input: toggle');
toggle$.next();

console.log('Input: hide');
hide$.next();
