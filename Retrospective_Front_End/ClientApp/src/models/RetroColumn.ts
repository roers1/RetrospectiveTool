import {RetroCard} from './RetroCard';
import { BaseItem } from './BaseItem';

export class RetroColumn {
  constructor(
    public id: number,
    public title: string,
    public retroItems: BaseItem[],
    public retrospectiveId: number
  )
}
