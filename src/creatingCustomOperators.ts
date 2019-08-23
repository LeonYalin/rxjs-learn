import { map, mergeMap, filter, tap, take } from 'rxjs/operators';
import { delimeterMsg, logF } from "./utils";
import { of, from, Subscriber, Observable } from "rxjs";
import { ajax } from 'rxjs/ajax';
import Person from './person';
import { persons } from './fixtures';

function basicOperatorStructure() {
  const sourse$ = of(1, 2, 3, 4, 5);
  const doubler = map((val: number) => val * 2);
  const doubled$ = doubler(sourse$);
  doubled$.subscribe(val => console.log(val));
}

function usingCustomOperatorToWrapExistingOperator() {
  const source$ = of(1, 2, 3, 4, 5);
  const doublerOperator = function () {
    return map((val: number) => val * 2);
  }
  source$
  .pipe(doublerOperator())
  .subscribe(doubledVal => console.log(doubledVal));
}

function usingCustomOperatorToWrapMultipleOperatorsSimple() {
  function customFilterAndTapOperatorSimple(filterByName: string, shouldLog: boolean) {
    return ((source$: Observable<Person>) => source$.pipe(
      filter(p => p.getFirstName() === filterByName),
      tap(item => shouldLog ? console.log('tap', item) : null),
    ));
  }

  from(persons)
    .pipe(customFilterAndTapOperatorSimple('Leon', true))
    .subscribe(data => console.log(data));
}

function usingCustomOperatorToWrapMultipleOperators() {
  function customFilterAndTapOperator(filterByName: string, shouldLog: boolean) {
    return ((source$: Observable<Person>) => {
      return new Observable((subscriber: Subscriber<Person>) => {
        return source$.subscribe(
          person => {
            if (person.getFirstName() === filterByName) {
              subscriber.next(person);
              if (shouldLog) {
                console.log(person);
              }
            }
          },
          err => subscriber.error(err),
          () => subscriber.complete(),
        )
      });
    });
  }

  from(persons)
    .pipe(
      // filter(p => p.getFirstName() === 'Leon'),
      // tap(item => console.log('tap', item)),
      customFilterAndTapOperator('Leon', true),
    )
    .subscribe((data: Person) => console.log('data after pipe', data))
}

export default function createCustomOperators() {
  delimeterMsg('CREATING CUSTOM OPERATORS');
  logF(basicOperatorStructure);
  logF(usingCustomOperatorToWrapExistingOperator);
  logF(usingCustomOperatorToWrapMultipleOperatorsSimple);
  logF(usingCustomOperatorToWrapMultipleOperators);
}