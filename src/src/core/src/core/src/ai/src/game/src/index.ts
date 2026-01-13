import { GameTable } from './game/table';

console.log("♠️ ♥️  GUANDAN ENGINE V1.0 ♣️ ♦️");

// Initialize game with 1 Human ('You') and rest Bots
const game = new GameTable(['You']);

// Simulate a few bot turns to prove it works
const simulate = async () => {
  // Let's pretend it's Bot-1's turn
  game.turnIndex = 1; 
  
  for(let i=0; i<5; i++) {
    console.log(`\n--- Turn ${i+1} ---`);
    game.playBotTurn();
    await new Promise(r => setTimeout(r, 1000)); // Dramatic pause
  }
};

simulate();
