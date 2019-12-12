import { RetroCard } from './RetroCard';

export class RetroColumn {
  constructor(
    public id: number,
    public title: string,
    public retrocards: RetroCard[]
  ) { }

  addRetroCard(retrocard: RetroCard) {
    this.retrocards.push(retrocard);
  }

  removeRetroCard(retrocardId: number) {
    if (retrocardId >= 0) {
      this.retrocards.filter(rc => rc.id != retrocardId);
    }
  }
}
