export class RetroCard {
  constructor(
    public id: number,
    public content: string
  ) { }

  updateContent(input: string) {
    this.content = input;
  }
}
