import { Observable } from 'rxjs';

import { BaseInput, BaseState, StateTransitions } from '../models';
import { rxjsStore } from '../store';
import { StateMachine } from '../state';

/**
 * Factory state machine based on rxjsStore.
 */
export const rxjsFsmFactory = <S extends BaseState, T extends BaseInput>(
  transitions: StateTransitions<S, T>,
  input$: Observable<T>,
  initialState: S,
) => new StateMachine(transitions, input$, rxjsStore(initialState));
