import Person from "./person";
import Company from "./company";

const persons: Array<Person> = [
  new Person('Leon', 'Yalin'),
  new Person('Nelly', 'Yalin'),
  new Person('Liza', 'Yalin'),
];

const companies: Array<Company> = [
  new Company('Google', 'USA'),
  new Company('Yandex', 'Russia'),
  new Company('Rafael', 'Israel'),
  new Company('Cellebrite', 'Israel'),
];

export { persons, companies };