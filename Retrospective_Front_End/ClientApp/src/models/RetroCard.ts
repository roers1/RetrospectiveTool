import { BaseItem } from './BaseItem';

export class RetroCard extends BaseItem {

  constructor(
    public id: number,
    public content: string,
    public position: number,
    public retroColumnId: number,
    public upVotes: number,
    public downVotes: number,
    public familyId: number
  ) {
    super(id, content, position, retroColumnId);
  }
}


