import { multicast, refCount, publish, share, publishLast, publishBehavior } from 'rxjs/operators';
import { delimeterMsg, logF, log } from "./utils";
import { Subject, of, Observable, Observer, ConnectableObservable } from 'rxjs';

function creatingSubjects() {
  const subject$ = new Subject();
  subject$.subscribe(data => console.log(`Observer 1 data: ${data}`));
  subject$.subscribe(data => console.log(`Observer 2 data: ${data}`));

  log('Subject can produce values for multiple observables, a.k.a. Multicasting.',
    'Subject can produce values directly or act as a proxy and pass values from observables');

  subject$.next('Hello');
  of(1, 2, 3).subscribe(subject$);
}

function coldAndHotObservables() {
  log('The difference between cold and hot observables is that in cold observable values are produced inside the observable, and in hot outside.');

  const source1$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });

  log('Only one obeserver can subscribe to cold observables ,a.k.a unicast. Data produced from cold observable will be different for each observer');
  source1$.subscribe(data => console.log(`Cold observer 1: ${data}`));
  source1$.subscribe(data => console.log(`Cold observer 2: ${data}`));

  const random: number = Math.random();
  const source2$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(random);
  });

  log('Hot observables are multicast. Data produced from hot observable will be same for all observers');
  source2$.subscribe(data => console.log(`Hot observer 1: ${data}`));
  source2$.subscribe(data => console.log(`Hot observer 2: ${data}`));
}

function usingSubjectsToConvertColdObservableToHot() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });

  const subject$ = new Subject();
  subject$.subscribe(data => console.log(`Conversing cold to hot observable 1: ${data}`));
  subject$.subscribe(data => console.log(`Conversing cold to hot observable 2: ${data}`));
  source$.subscribe(subject$);
}

function usingMulticastOperator() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  }).pipe(
    multicast(new Subject()),
  );

  (<ConnectableObservable<number>>source$).connect();
  source$.subscribe(data => console.log(`Using multicast operator 1: ${data}`));
  source$.subscribe(data => console.log(`Using multicast operator 2: ${data}`));
}

function usingMulticastOperatorWithRefCount() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });
  log('Using refCount will automatically start observable execution when observers.length > 0')
  source$.pipe(
    multicast(new Subject()),
    refCount(),
  )
  source$.subscribe(data => console.log(`Using multicast operator with refCount 1: ${data}`));
  source$.subscribe(data => console.log(`Using multicast operator with refCount 2: ${data}`));
}

function usingPublishOperatorWithRefCount() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });
  log('Using publish with refCount will eliminate the need of manually passing the subject');
  source$.pipe(
    publish(),
    refCount(),
  )
  source$.subscribe(data => console.log(`Using publish operator with refCount 1: ${data}`));
  source$.subscribe(data => console.log(`Using publish operator with refCount 2: ${data}`));
}

function usingShareOperator() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });

  log('Using share will automate the refCount');

  source$.pipe(
    share(),
  )
  source$.subscribe(data => console.log(`Using share operator 1: ${data}`));
  source$.subscribe(data => console.log(`Using share operator 2: ${data}`));
}

function usingSpecializedSubjects() {
  const source$ = new Observable((subscriber: Observer<number>) => {
    subscriber.next(Math.random());
  });

  log('Using some specialized operators that use specizlized Subjct behind the scenes.',
    'publishLast() operator uses AsyncSubject. This subject only emits the last value',
    `publishBehavior() operator uses BehaviorSubject. This subject emits an initial value before sending the first value.
     After that is sends the mose recent value to newly subscribed observable.`,
    'publishReplay() operator uses ReplaySubject. This subject will replay all the values according to the provided configuration');

  source$.pipe(
    // publishLast(),
    // publishBehavior(42),
    // publishReplay(config),
    publish(),
    refCount(),
  )
  source$.subscribe(data => console.log(`Using share operator 1: ${data}`));
  source$.subscribe(data => console.log(`Using share operator 2: ${data}`));
}

export default function usingSubjectsAndMulticastedObservables() {
  delimeterMsg('USING SUBJECTS AND MULTICASTED OBSERVABLES');
  logF(creatingSubjects);
  logF(coldAndHotObservables);
  logF(usingSubjectsToConvertColdObservableToHot);
  logF(usingMulticastOperator);
  logF(usingMulticastOperatorWithRefCount);
  logF(usingPublishOperatorWithRefCount);
  logF(usingShareOperator);
  logF(usingSpecializedSubjects);
}