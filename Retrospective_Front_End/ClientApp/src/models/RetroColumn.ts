import {RetroCard} from './RetroCard';

export class RetroColumn {
  constructor(
    public id: number,
    public title: string,
    public cards: RetroCard[]
  ) {
  }

  addRetroCard(card: RetroCard) {
    this.cards.push(card);
  }

  removeRetroCard(cardId: number) {
    if (cardId >= 0) {
      this.cards.filter(rc => rc.id !== cardId);
    }
  }
}
