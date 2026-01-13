// src/types.ts

// Suits: D=Diamond, C=Club, H=Heart, S=Spade
export type Suit = 'D' | 'C' | 'H' | 'S' | 'Joker';

// Ranks: 11=J, 12=Q, 13=K, 14=A, 20=Small Joker, 30=Big Joker
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 20 | 30;

export interface Card {
  id: string;      // Unique ID for frontend rendering keys
  suit: Suit;
  rank: Rank;
  isLevelCard: boolean; // Is this card the current level? (e.g. 2)
  isWild: boolean;      // Is this a Heart Level Card?
}

export type HandType = 'SINGLE' | 'PAIR' | 'TRIPLE' | 'BOMB' | 'STRAIGHT' | 'PASS';

export interface PlayedHand {
  playerId: string;
  type: HandType;
  cards: Card[];
  power: number; // Calculated power value for comparison
}

export interface Player {
  id: string;
  isBot: boolean;
  hand: Card[];
  team: 1 | 2; // Team 1 vs Team 2
}
