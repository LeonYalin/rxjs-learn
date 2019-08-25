import { TestScheduler } from 'rxjs/testing';
import { delay, take } from 'rxjs/operators';

describe('Project tests', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('produces a single value and completion message', () => {
    scheduler.run(helpers => {
      const source$ = helpers.cold('a|');
      const expected = 'a|';
      helpers.expectObservable(source$).toBe(expected);
    });
  });

  it('should delay the values produced', () => {
    scheduler.run(helpers => {
      const source$ = helpers.cold('-a-b-c-d|').pipe(delay(5));
      const expected =        '------a-b-c-d|'; // or '5ms -a-b-c-d|'
      helpers.expectObservable(source$).toBe(expected);
    });
  });

  it('should take the correct number of values', () => {
    scheduler.run(helpers => {
      const source$ = helpers.cold('--a--b--c--d|');
      const expected =             '--a--b--(c|)';
      const expectedSub =          '^-------!';
      helpers.expectObservable(source$.pipe(take(3))).toBe(expected);
      helpers.expectSubscriptions(source$.subscriptions).toBe(expectedSub);
    });
  });
});