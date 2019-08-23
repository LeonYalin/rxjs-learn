export default class Person {
  constructor(private firstName: string, private lastName: string) {
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  sayHello(): string {
    return `Hello, I am ${this.firstName} ${this.lastName}!`;
  }
}