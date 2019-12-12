export class RetroCard {
  constructor(
    public id: number,
      public content: string,
    public position: number
  ) { }

  updateContent(input: string) {
    this.content = input;
  }
}
