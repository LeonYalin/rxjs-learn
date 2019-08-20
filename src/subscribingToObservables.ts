import { delimeterMsg, log, logF } from "./utils";
import { persons } from "./fixtures";
import { from, Observer, Observable, Subscriber } from "rxjs";
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
  // todo:
}

export default function subscribingToObservables() {
  delimeterMsg('SUBSCRIBING TO OBSERVABLES');
  logF(creatingObservers);
  logF(creatingMultipleObservers);
  logF(usingIntervalAndUnsubscribingFromObservable);
}