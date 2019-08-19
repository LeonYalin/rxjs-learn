import { delimeterMsg, log, logF } from "./utils";
import { persons } from "./fixtures";
import { from, Observer } from "rxjs";
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

export default function subscribingToObservables() {
  delimeterMsg('SUBSCRIBING TO OBSERVABLES');
  logF(creatingObservers);
}