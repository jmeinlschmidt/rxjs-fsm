import { map, pipe } from 'rxjs';

import { BaseInput } from '../models';

export const markInput = <T, R extends BaseInput>() => (label: R) => pipe(map<T, R>(() => label));
