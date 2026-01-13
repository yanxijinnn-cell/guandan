import { DeckManager } from '../core/deck';
import { RuleEngine } from '../core/rules';
import { SmartBot } from '../ai/bot';
import { Player, Card, Rank, PlayedHand } from '../types';

export class GameTable {
  players: Player[] = [];
  bots: Map<string, SmartBot> = new Map();
  currentLevel: Rank = 2;
  lastPlayedHand: PlayedHand | null = null;
  turnIndex: number = 0;

  constructor(humanIds: string[]) {
    // Initialize 4 Players
    for (let i = 0; i < 4; i++) {
      const isHuman = i < humanIds.length;
      const id = isHuman ? humanIds[i] : `Bot-${i}`;
      
      const player: Player = {
        id,
        isBot: !isHuman,
        hand: [],
        team: (i % 2 === 0) ? 1 : 2 // Team 1: P0, P2. Team 2: P1, P3
      };
      
      this.players.push(player);

      if (!isHuman) {
        this.bots.set(id, new SmartBot(player, this.currentLevel));
      }
    }
    this.startRound();
  }

  startRound() {
    console.log(`\n--- New Round (Level ${this.currentLevel}) ---`);
    const deck = DeckManager.createDeck(this.currentLevel);
    
    // Deal cards (27 each)
    this.players.forEach(p => {
      p.hand = deck.splice(0, 27);
      p.hand = RuleEngine.sortHand(p.hand, this.currentLevel);
    });
    
    console.log("Cards Dealt.");
  }

  // Simulate one turn for a Bot
  playBotTurn() {
    const player = this.players[this.turnIndex];
    if (!player.isBot) return;

    const bot = this.bots.get(player.id);
    if (bot) {
      const cardsToPlay = bot.decideMove(this.lastPlayedHand);
      
      if (cardsToPlay) {
        console.log(`✅ ${player.id} plays:`, cardsToPlay.map(c => `${c.suit}${c.rank}`).join(', '));
        
        // Update Game State
        this.lastPlayedHand = {
          playerId: player.id,
          type: 'SINGLE', // Simplified
          cards: cardsToPlay,
          power: RuleEngine.getCardPower(cardsToPlay[0], this.currentLevel)
        };
        
        // Remove cards from hand
        player.hand = player.hand.filter(h => !cardsToPlay.includes(h));
      } else {
        console.log(`🚫 ${player.id} passes.`);
      }
      
      // Rotate turn
      this.turnIndex = (this.turnIndex + 1) % 4;
    }
  }
}
