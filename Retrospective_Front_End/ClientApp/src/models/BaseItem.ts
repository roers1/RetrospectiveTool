export class BaseItem {

  constructor(
    public id: number,
    public content: string,
    public position: number,
    public retroColumnId: number
  ) {
  }
}
