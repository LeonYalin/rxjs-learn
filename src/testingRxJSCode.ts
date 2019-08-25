import { delimeterMsg, logF, log } from "./utils";

function observablesMarbleSynthax() {
  const helpers = { cold(str: string) { }, hot(str: string) { } }; // mock
  const source$ = helpers.cold('-a-b-c');
  const source2$ = helpers.cold('--a-4---c-8|');
  const source3$ = helpers.cold(' --a-4 12ms c-8#');
  const source4$ = helpers.hot('-a-^-b-(cde)---f|');

  const subscripton = '^---!';
  const subscripton2 = '--^-';
  const subscripton3 = '^ 10ms !';

  log('Ascii marble synthax for observables:',
    'Every char is a frame of 1 virtual ms. "-" means 1ms of waiting. "a" means actual value.',
    'Whitespaces are ignored. "|" means observable completion, "#" means observable error.',
    '"^" means subscribing, "(abc)" means parallel bunch of values, "12ms" means 12ms of waiting');
}

function writingActualTests() {
  log('Please view the tests.spec.ts file contents.');
}

export default function testingRxJSCode() {
  delimeterMsg('TESTING RXJS CODE');
  logF(observablesMarbleSynthax);
  logF(writingActualTests);
}