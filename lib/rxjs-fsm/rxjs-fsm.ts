import { Observable } from 'rxjs';

import { Input, State, StateTransitions } from '../models';
import { rxjsStore } from '../store';
import { StateMachine } from '../state';

/**
 * Factory state machine based on rxjsStore.
 */
export const rxjsFsmFactory = <S extends State, T extends Input>(
  transitions: StateTransitions<S, T>,
  input$: Observable<T>,
  initialState: S,
) => new StateMachine(transitions, input$, rxjsStore(initialState));
