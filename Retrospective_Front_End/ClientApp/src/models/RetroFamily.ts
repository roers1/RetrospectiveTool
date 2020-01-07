import { BaseItem } from "./BaseItem";

export class RetroCard extends BaseItem {

  constructor(
    public id: number,
    public content: string,
    public position: number,
    public retroColumnId: number,
    public retroCards:  RetroCard[]
  ) {
    super(id, content, position, retroColumnId);
  }
}


