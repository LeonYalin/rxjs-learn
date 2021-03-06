import creatingObservables from "./creatingObservables";
import subscribingToObservables from "./subscribingToObservables";
import usingOperators from "./usingOperators";
import createCustomOperators from "./creatingCustomOperators";
import usingSubjectsAndMulticastedObservables from "./usingSubjectsAndMulticastedObservables";
import usingSchedulers from "./usingSchedulers";
import testingRxJSCode from "./testingRxJsCode";

(function main() {
  creatingObservables();
  subscribingToObservables();
  usingOperators();
  createCustomOperators();
  usingSubjectsAndMulticastedObservables();
  usingSchedulers();
  testingRxJSCode();
}());