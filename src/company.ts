export default class Company {
  constructor(private name: string,  private country: string) {
  }

  toString(): string {
    return `Company[name=${this.name}], country=${this.country}`;
  }
}