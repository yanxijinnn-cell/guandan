import { Card, Rank } from '../types';

export class RuleEngine {
  // Calculate relative power of a card based on current level
  static getCardPower(card: Card, currentLevel: Rank): number {
    if (card.suit === 'Joker') return card.rank + 100; // Jokers are top
    if (card.isLevelCard) {
      return card.suit === 'H' ? 90 : 80; // Heart level card > Other level cards
    }
    // Standard cards
    return card.rank === currentLevel ? 80 : card.rank;
  }

  static sortHand(hand: Card[], currentLevel: Rank): Card[] {
    return [...hand].sort((a, b) => 
      this.getCardPower(a, currentLevel) - this.getCardPower(b, currentLevel)
    );
  }
  
  // Basic validation (Expanded later for complex hands)
  static isValidMove(cards: Card[], lastHand: Card[] | null): boolean {
    if (!lastHand) return true; // Free move
    // Simplified: Only allow if same amount of cards and higher rank
    return cards.length === lastHand.length; 
  }
}
