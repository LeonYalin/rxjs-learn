import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap, take, tap, catchError, takeUntil } from 'rxjs/operators';
import { delimeterMsg, logF } from "./utils";
import { from, of, throwError, fromEvent } from 'rxjs';

function creatingOperators() {
  const btn$ = fromEvent(document.getElementById('fromEvent'), 'click');
  
  ajax('https://jsonplaceholder.typicode.com/posts/')
    .pipe(
      mergeMap(ajaxData => from(ajaxData.response).pipe(take(5))),
      filter(item => item['id'] === 1),
      tap(item => console.log('tap', item)),
      takeUntil(btn$), /* will stop when btn$ will emit a value */
      // catchError(err => of({firstName: 'Leon', lastName: 'Yalin'}) /* will not go to subscribe error callback */
      // catchError((err, caught) => caught)
      // catchError(err => { throw new Error(err) })
      catchError(err => { return throwError(err) })
    )
    .subscribe(data => console.log('data after pipe', data))
}

export default function usingOperators() {
  delimeterMsg('USING OPERATORS');
  logF(creatingOperators);
}