export default class Person {
  constructor(private firstName: string, private lastName: string) {
    
  }

  sayHello(): string {
    return `Hello ${this.firstName} ${this.lastName}`;
  }
}