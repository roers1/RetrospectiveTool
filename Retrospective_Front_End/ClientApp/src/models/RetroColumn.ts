import { RetroCard } from './RetroCard';

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

  removeRetroCard(card: RetroCard) {
    const removeCard = this.retroCards.map(c => c.id).indexOf(card.id);

    this.retroCards.splice(removeCard, 1);
  }
}
