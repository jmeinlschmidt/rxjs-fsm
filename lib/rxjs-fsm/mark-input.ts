import { map, pipe } from 'rxjs';
import { Input } from './models';

export const markInput = <T, R extends Input>(label: R) => pipe(map<T, R>(() => label));
