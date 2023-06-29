import { map, pipe } from 'rxjs';
import { Input } from './models';

const markInput = <T extends Input>(label: T) => pipe(map<void, T>(() => label));

export default markInput;
