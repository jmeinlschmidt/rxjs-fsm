import { Subject, merge } from 'rxjs';

import { fsmHelpersFactory } from '../lib';

import { Input, State, initialState, transitions } from './state.config';

/**
 * Example 3
 * Demonstrates creating a FSM using by the `fsm` operator.
 */

const {
  markInput,
  fsm,
} = fsmHelpersFactory<State, Input>(transitions);

// Define inputs
const toggle$ = new Subject<void>();
const hide$ = new Subject<void>();

// Use helper functions
const input$ = merge(
  toggle$.pipe(markInput('toggle')),
  hide$.pipe(markInput('hide')),
);

const state$ = input$.pipe(fsm(initialState));

// Listen
state$.subscribe((newState) => console.log('New state:', newState));

console.log('Initial state:', initialState);
console.log('Input: toggle');
toggle$.next();
console.log('Input: toggle');
toggle$.next();
console.log('Input: toggle');
toggle$.next();

console.log('Input: hide');
hide$.next();
