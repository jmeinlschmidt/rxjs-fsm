import { markInput } from './mark-input';
import { TestScheduler } from 'rxjs/testing';

type Input = 'X' | 'Y';

describe('markInput', () => {
  let testScheduler: TestScheduler;
  const label: Input = 'X';

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should mark input emissions correctly', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const inputSeq = '       1-       2-       3';
      const expected = `${label}-${label}-${label}`;

      const input$ = hot<Input>(inputSeq);
      const marked$ = input$.pipe(markInput(label));

      expectObservable(marked$).toBe(expected);
    });
  });
});
