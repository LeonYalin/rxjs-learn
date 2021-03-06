import { delimeterMsg, log, logToHTML, logF } from "./utils";
import { Observable, Observer, of, from, concat, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { persons, companies } from "./fixtures";
import Person from "./person";

function creatingNewObservablesUsingConstructor() {
  const subscribe = function (observer: Observer<Person>) {
    if (document.title === null) {
      observer.error('no title');
    }
    for (const person of persons) {
      observer.next(person);
    }
    observer.complete();

    return () => {
      console.log('This is called when observable completes / errors.\nExecute teardown and cleanup in this function.');
    }
  }
  const persons$ = new Observable(subscribe);
  persons$.subscribe(person => console.log(person.sayHello()));
}

function creatingObservablesUsingStaticCall() {
  const persons$: Observable<Person> = Observable.create((observer: Observer<Person>) => {
    if (document.title === null) {
      observer.error('no title');
    }
    for (const person of persons) {
      observer.next(person);
    }
    observer.complete();

    return () => {
      console.log('This is called when observable completes / errors.\nExecute teardown and cleanup in this function.');
    }
  });
  persons$.subscribe(person => console.log(person.sayHello()));
}

function creatingObservablesUsingOfFunction() {
  const source$ = of('hello', 2, true, persons[0].sayHello());
  source$.subscribe(val => console.log(val));
}

function creatingObservablesUsingFromFunction() {
  const source$ = from(persons);
  source$.subscribe(person => console.log(person));
}

function combiningObservablesUsingConcatFunction() {
  const source$ = concat(from(persons), from(companies));
  source$.subscribe(data => console.log(data));
}

function creatingObservablesFromEventsUsingFromEventFunction() {
  const source$ = fromEvent(document.getElementById('fromEvent'), 'click');
  source$.subscribe((data: MouseEvent) => {
    logToHTML(`button event:${data.type}`);
  });
}

function creatingObservablesFromAjaxCallUsingAjaxFunction() {
  const source$ = fromEvent(document.getElementById('fromEvent'), 'click');
  source$.subscribe((data: MouseEvent) => {
    ajax('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe(data => {
        console.log(data.response);
      });
  });
}

export default function creatingObservables() {
  delimeterMsg('CREATING NEW OBSERVABLES');
  logF(creatingNewObservablesUsingConstructor);
  logF(creatingObservablesUsingStaticCall);
  logF(creatingObservablesUsingOfFunction);
  logF(creatingObservablesUsingFromFunction);
  logF(combiningObservablesUsingConcatFunction);
  logF(creatingObservablesFromEventsUsingFromEventFunction);
  logF(creatingObservablesFromAjaxCallUsingAjaxFunction);
}