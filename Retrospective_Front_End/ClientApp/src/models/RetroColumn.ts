import {RetroCard} from './RetroCard';

export class RetroColumn {
  constructor(
    public id: number,
    public title: string,
    public retroCards: RetroCard[],
    public retrospectiveId: number
  ) {
  }

  addRetroCard(card: RetroCard) {
    this.retroCards.push(card);
  }

  removeRetroCard(cardId: number) {
    if (cardId >= 0) {
      this.retroCards.filter(rc => rc.id !== cardId);
    }
  }
}
