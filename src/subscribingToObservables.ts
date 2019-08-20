import { delimeterMsg, log, logF } from "./utils";
import { persons } from "./fixtures";
import { from, Observer, Observable, Subscriber, interval } from "rxjs";
import Person from "./person";

function creatingObservers() {
  const persons$ = from(persons);
  const personsObserver: Observer<Person> = {
    next: person => console.log(person.sayHello()),
    error: e => console.log(e),
    complete: () => console.log('personsObserver complete'),
  }
  persons$.subscribe(personsObserver);
}

function creatingMultipleObservers() {
  const persons$ = new Observable((subscriber: Subscriber<number>) => {
    persons.forEach(p => subscriber.next(new Date().getTime()));
    subscriber.complete();
  });

  persons$.subscribe(p => log('Observer 1', p));
  persons$.subscribe(p => log('Observer 2', p));
  log('Note that output is different for each observable.', 'Each observable will receive its own collection of values');
}

function usingIntervalAndUnsubscribingFromObservable() {
  let count = 0;
  const timer$ = interval(10);
  const timerSubscription = timer$.subscribe(
    (val) => {
      if (count === 5) {
        timerSubscription.unsubscribe();
        return;
      }
      console.log('interval observable', val);
      count++;
    },
    null,
    () => console.log('interval observable complete'),
  );
}

function unsubscribingFromMultipleSubscriptions() {
  const persons$ = from(persons);
  const pSub1 = persons$.subscribe(p => console.log(p.sayHello()));
  const pSub2 = persons$.subscribe(p => console.log(p));
  pSub1.add(pSub2);
  pSub1.unsubscribe() // will also unsubscribe from pSub2  
}

export default function subscribingToObservables() {
  delimeterMsg('SUBSCRIBING TO OBSERVABLES');
  logF(creatingObservers);
  logF(creatingMultipleObservers);
  logF(usingIntervalAndUnsubscribingFromObservable);
  logF(unsubscribingFromMultipleSubscriptions);
}