import {RetroCard} from './RetroCard';
import {BaseItem} from './BaseItem';

export class RetroColumn {

  // @ts-ignore
  constructor(
    public id: number,
    public title: string,
    public retroItems: BaseItem[],
    public retrospectiveId: number
  ) {
  }
}
