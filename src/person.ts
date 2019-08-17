export default class Person {
  constructor(private firstName: string, private lastName: string) {
    
  }

  sayHello(): string {
    return `Hello, I am ${this.firstName} ${this.lastName}!`;
  }
}