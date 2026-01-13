import { Card, Rank, Suit } from '../types';

export class DeckManager {
  static createDeck(currentLevel: Rank): Card[] {
    const suits: Suit[] = ['D', 'C', 'H', 'S'];
    const ranks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let cards: Card[] = [];
    let idCounter = 0;

    // Guandan uses 2 decks
    for (let i = 0; i < 2; i++) {
      // Standard Cards
      for (const suit of suits) {
        for (const rank of ranks) {
          cards.push({
            id: `c-${idCounter++}`,
            suit,
            rank,
            isLevelCard: rank === currentLevel,
            isWild: rank === currentLevel && suit === 'H'
          });
        }
      }
      // Jokers
      cards.push({ id: `c-${idCounter++}`, suit: 'Joker', rank: 20, isLevelCard: false, isWild: false });
      cards.push({ id: `c-${idCounter++}`, suit: 'Joker', rank: 30, isLevelCard: false, isWild: false });
    }
    return this.shuffle(cards);
  }

  static shuffle(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
