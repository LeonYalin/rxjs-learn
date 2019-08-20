import { ajax } from 'rxjs/ajax';
import { filter, map } from 'rxjs/operators';
import { delimeterMsg, logF } from "./utils";

function creatingOperators() {
  ajax('https://jsonplaceholder.typicode.com/posts/')
  .pipe(
    map(ajaxData => ajaxData.response)
  )
  .subscribe(data => console.log('data after pipe', data))
}

export default function usingOperators() {
  delimeterMsg('USING OPERATORS');
  logF(creatingOperators);
}