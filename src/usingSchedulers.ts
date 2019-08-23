import { delimeterMsg, logF } from "./utils";
import { of, queueScheduler, asapScheduler, asyncScheduler, Observable, from } from "rxjs";
import { merge, tap, observeOn } from "rxjs/operators";

function usingDifferentSchedulers() {
  console.log('start script');

  const queue$ = of('QueueScheduler (synchronious)', queueScheduler);
  const asap$ = of('AsapScheduler (async micro task)', asapScheduler);
  const async$ = of('AsyncScheduler (async task)', asyncScheduler);

  const source$ = new Observable<string>();
  source$
    .pipe(merge(queue$, asap$, async$))
    .subscribe(val => console.log(val));

  console.log('end script');
}

function switchingBetweenSchedulersUsingObserveOnOperator() {
  console.log('start script');

  const source$ = from([1, 2, 3, 4], queueScheduler);
  source$.pipe(
    tap(val => console.log('synchronious val before applying asyncScheduler', val)),
    observeOn(asyncScheduler),
    tap(val => console.log('Doubled val after applying asyncScheduler', val * 2))
  )
    .subscribe(val => console.log(val));

  console.log('end script');
}

export default function usingSchedulers() {
  delimeterMsg('USING SCHEDULERS');
  logF(usingDifferentSchedulers);
  logF(switchingBetweenSchedulersUsingObserveOnOperator);
}