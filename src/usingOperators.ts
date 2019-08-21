import { ajax } from 'rxjs/ajax';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { delimeterMsg, logF } from "./utils";
import { from } from 'rxjs';

function creatingOperators() {
  ajax('https://jsonplaceholder.typicode.com/posts/')
  .pipe(
    mergeMap(ajaxData => from(ajaxData.response).pipe(take(5))),
    filter(item => item['id'] === 1),
    tap(item => console.log('tap', item)),
  )
  .subscribe(data => console.log('data after pipe', data))
}

export default function usingOperators() {
  delimeterMsg('USING OPERATORS');
  logF(creatingOperators);
}