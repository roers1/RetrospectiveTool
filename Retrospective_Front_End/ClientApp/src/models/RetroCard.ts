export class RetroCard {

  constructor(
    public id: number,
    public content: string,
    public position: number,
    public retroColumnId: number,
    // public downVoters: number[],
    // public upVoters: number[]
    public upVotes: number,
    public downVotes: number
  ) {
  }

  updateContent(input: string) {
    this.content = input;
  }
}
