import { Player, Card, Rank, PlayedHand } from '../types';
import { RuleEngine } from '../core/rules';

export class SmartBot {
  player: Player;
  currentLevel: Rank;

  constructor(player: Player, level: Rank) {
    this.player = player;
    this.currentLevel = level;
  }

  // The Brain: Decide what to play
  decideMove(lastHand: PlayedHand | null): Card[] | null {
    // Sort my hand first
    this.player.hand = RuleEngine.sortHand(this.player.hand, this.currentLevel);

    console.log(`🤖 Bot ${this.player.id} is thinking...`);

    // 1. If it's my turn to lead (Free Move)
    if (!lastHand || lastHand.playerId === this.player.id) {
      // Strategy: Play smallest single card to unload trash
      return [this.player.hand[0]];
    }

    // 2. Logic to follow a hand
    if (lastHand.type === 'SINGLE') {
      const targetPower = lastHand.power;
      // Find the smallest card that beats the target
      const winner = this.player.hand.find(c => 
        RuleEngine.getCardPower(c, this.currentLevel) > targetPower
      );
      
      return winner ? [winner] : null; // Pass if can't beat
    }

    // Default: Pass on complex hands (MVP limit)
    return null;
  }
}
