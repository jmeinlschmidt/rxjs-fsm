export type Input = string | number;
export type State = string | number;

export type StateTransition<S extends State, T extends Input> = Record<T, S>;
export type StateTransitions<S extends State, T extends Input> = Record<S, StateTransition<S, T>>;
