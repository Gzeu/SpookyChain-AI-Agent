#!/usr/bin/env node
/**
 * 🎃 SpookyChain Halloween Hunt - Interactive Game
 * Blockchain-powered Halloween adventure game
 */

const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

class HalloweenHuntGame {
    constructor() {
        this.playerStats = {
            name: 'Unknown Necromancer',
            level: 'Novice',
            score: 0,
            objectivesCompleted: 0,
            ghostTrades: 0,
            cursedContractsFound: 0,
            zombiesResurrected: 0,
            walletFound: false,
            cryptoCryptUnlocked: false
        };
        
        this.spookyEvents = [
            "🦇 A bat flies across your terminal!",
            "👻 Ghost transaction detected in mempool...",
            "🕷️ Spider crawls through your code...",
            "🌙 Full moon boosts your trading powers!",
            "⚡ Lightning strikes - gas fees reduced!",
            "🔮 Mysterious blockchain energy detected...",
            "🧙‍♀️ A witch whispers smart contract secrets...",
            "🎃 Pumpkin-shaped blocks appear in the chain!"
        ];
        
        this.cursedContracts = [
            "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq666llls13",
            "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqevil7777",
            "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdemon123",
            "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhex666s",
            "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqspook13"
        ];
        
        this.hiddenWallet = "erd1spooky7777ghost1337phantom666witch999necromancer13";
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    async startGame() {
        console.clear();
        this.displayBanner();
        
        console.log("\n🎃 Welcome to the SpookyChain Halloween Hunt! 🎃\n");
        console.log("Enter the dark world of blockchain necromancy...");
        console.log("Complete objectives to become the ultimate Digital Ghost Master!\n");
        
        await this.getPlayerName();
        await this.mainGameLoop();
    }
    
    displayBanner() {
        console.log(
            "\n" +
            "🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃\n" +
            "    SPOOKYCHAIN HALLOWEEN HUNT GAME\n" +
            "      Interactive Blockchain Adventure\n" +
            "🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃👻🦇🎃\n"
        );
    }
    
    async getPlayerName() {
        return new Promise((resolve) => {
            this.rl.question('Enter your necromancer name: ', (name) => {
                this.playerStats.name = name || 'Unknown Necromancer';
                console.log(`\n🧙‍♀️ Welcome, ${this.playerStats.name}! Your dark journey begins...\n`);
                resolve();
            });
        });
    }
    
    async mainGameLoop() {
        let playing = true;
        
        while (playing) {
            this.displayMenu();
            const choice = await this.getChoice();
            
            switch (choice) {
                case '1':
                    await this.huntHiddenWallet();
                    break;
                case '2':
                    await this.summonGhostTrade();
                    break;
                case '3':
                    await this.detectCursedContract();
                    break;
                case '4':
                    await this.resurrectZombieCode();
                    break;
                case '5':
                    await this.unlockCryptoCrypt();
                    break;
                case '6':
                    this.displayStats();
                    break;
                case '7':
                    this.triggerSpookyEvent();
                    break;
                case '8':
                    console.log("\n👻 Thanks for playing! May your blockchain adventures be spooky! 🎃");
                    playing = false;
                    break;
                default:
                    console.log("\n❌ Invalid choice! The spirits are confused...");
            }
            
            if (playing && choice !== '6' && choice !== '7') {
                await this.pressAnyKey();
            }
        }
        
        this.rl.close();
    }
    
    displayMenu() {
        console.log("\n🎯 Choose your spooky adventure:");
        console.log("1. 🔍 Hunt for Hidden Wallet");
        console.log("2. 👻 Summon Ghost Trade");
        console.log("3. 🔮 Detect Cursed Contract");
        console.log("4. 🧟‍♂️ Resurrect Zombie Code");
        console.log("5. 🗝️ Unlock Crypto Crypt");
        console.log("6. 📊 View Stats");
        console.log("7. 🎲 Random Spooky Event");
        console.log("8. 🚪 Exit Game");
    }
    
    async getChoice() {
        return new Promise((resolve) => {
            this.rl.question('\nEnter your choice (1-8): ', resolve);
        });
    }
    
    async huntHiddenWallet() {
        console.log("\n🔍 Hunting for the Hidden Wallet...");
        console.log("The blockchain whispers secrets in the dark...");
        
        const guess = await this.askQuestion("🧙‍♀️ Enter the hidden MultiversX wallet address: ");
        
        if (guess.toLowerCase().includes('spooky') || guess.includes(this.hiddenWallet)) {
            if (!this.playerStats.walletFound) {
                console.log("\n🎉 SUCCESS! You found the hidden wallet!");
                console.log(`💰 Wallet: ${this.hiddenWallet}`);
                this.playerStats.walletFound = true;
                this.playerStats.score += 100;
                this.updateObjectives();
            } else {
                console.log("\n👻 You already found this wallet, ghost!");
            }
        } else {
            console.log("\n❌ The wallet remains hidden in the shadows...");
            console.log("💡 Hint: Look for something 'spooky' in the address!");
        }
    }
    
    async summonGhostTrade() {
        console.log("\n👻 Summoning Ghost Trade...");
        
        const tokenId = await this.askQuestion("Enter token ID to trade (e.g., EGLD): ");
        const amount = await this.askQuestion("Enter amount: ");
        
        const tradeId = crypto.randomBytes(4).toString('hex');
        
        console.log("\n🌟 Ghost trade summoned successfully!");
        console.log(`👻 Trade ID: ghost_${tradeId}`);
        console.log(`💱 Token: ${tokenId}`);
        console.log(`💰 Amount: ${amount}`);
        console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
        
        this.playerStats.ghostTrades++;
        this.playerStats.score += 25;
        
        if (this.playerStats.ghostTrades >= 3) {
            console.log("\n🎉 Achievement: 3 Ghost Trades completed!");
            this.updateObjectives();
        }
    }
    
    async detectCursedContract() {
        console.log("\n🔮 Scanning for cursed contracts...");
        
        const contractAddress = await this.askQuestion("Enter contract address to scan: ");
        
        const isCursed = this.cursedContracts.includes(contractAddress) || 
                        contractAddress.includes('666') || 
                        contractAddress.includes('evil') || 
                        contractAddress.includes('demon');
        
        if (isCursed) {
            console.log("\n⚠️ CURSE DETECTED! This contract is malicious!");
            console.log("🛡️ Recommendation: AVOID AT ALL COSTS");
            this.playerStats.cursedContractsFound++;
            this.playerStats.score += 50;
            
            if (this.playerStats.cursedContractsFound >= 5) {
                console.log("\n🎉 Achievement: 5 Cursed Contracts detected!");
                this.updateObjectives();
            }
        } else {
            console.log("\n✅ Contract appears safe! No curses detected.");
        }
        
        console.log(`\n📊 Cursed contracts found so far: ${this.playerStats.cursedContractsFound}/5`);
    }
    
    async resurrectZombieCode() {
        console.log("\n🧟‍♂️ Attempting zombie code resurrection...");
        
        const fullMoon = Math.random() > 0.5;
        
        if (!fullMoon) {
            console.log("\n🌑 No full moon detected. Resurrection failed...");
            console.log("💡 Try again when lunar energy is stronger!");
            return;
        }
        
        console.log("\n🌕 Full moon detected! Perfect for resurrection...");
        console.log("🔮 Channeling necromantic energy...");
        
        await this.delay(2000);
        
        const success = Math.random() > 0.3;
        
        if (success) {
            console.log("\n🎉 SUCCESS! Zombie code has been resurrected!");
            console.log("🧟‍♂️ The dead code walks among the living again...");
            this.playerStats.zombiesResurrected++;
            this.playerStats.score += 75;
            this.updateObjectives();
        } else {
            console.log("\n💀 FAILED: The code spirit was too weak to return...");
            console.log("Try gathering more spiritual energy!");
        }
    }
    
    async unlockCryptoCrypt() {
        console.log("\n🗝️ Attempting to unlock the Crypto Crypt...");
        
        if (this.playerStats.objectivesCompleted < 3) {
            console.log("\n🔒 The crypt remains sealed!");
            console.log("💡 Complete more objectives to gain access...");
            return;
        }
        
        const puzzle = await this.askQuestion("🧩 Solve this: What has 64 characters and controls your crypto destiny? ");
        
        if (puzzle.toLowerCase().includes('private key') || puzzle.toLowerCase().includes('privatekey')) {
            if (!this.playerStats.cryptoCryptUnlocked) {
                console.log("\n🎉 CORRECT! The Crypto Crypt is unlocked!");
                console.log("🏆 You've discovered the ultimate blockchain secret!");
                console.log("💎 Legendary treasure obtained: Master Private Key Generator");
                this.playerStats.cryptoCryptUnlocked = true;
                this.playerStats.score += 200;
                this.updateObjectives();
            } else {
                console.log("\n👻 You already unlocked this crypt, master!");
            }
        } else {
            console.log("\n❌ Incorrect! The crypt remains sealed...");
            console.log("💡 Hint: It's something very important you should never share!");
        }
    }
    
    updateObjectives() {
        let completed = 0;
        
        if (this.playerStats.walletFound) completed++;
        if (this.playerStats.ghostTrades >= 3) completed++;
        if (this.playerStats.cursedContractsFound >= 5) completed++;
        if (this.playerStats.zombiesResurrected > 0) completed++;
        if (this.playerStats.cryptoCryptUnlocked) completed++;
        
        this.playerStats.objectivesCompleted = completed;
        
        // Update level based on objectives
        if (completed >= 5) {
            this.playerStats.level = 'Digital Ghost Master 👑';
        } else if (completed >= 4) {
            this.playerStats.level = 'Blockchain Witch 🧙‍♀️';
        } else if (completed >= 2) {
            this.playerStats.level = 'Novice Necromancer 🎃';
        }
    }
    
    displayStats() {
        console.log("\n📊 SPOOKY STATISTICS:");
        console.log("═".repeat(40));
        console.log(`👤 Name: ${this.playerStats.name}`);
        console.log(`🏆 Level: ${this.playerStats.level}`);
        console.log(`🎯 Score: ${this.playerStats.score}`);
        console.log(`✅ Objectives Completed: ${this.playerStats.objectivesCompleted}/5`);
        console.log(`\n🎮 PROGRESS:");
        console.log(`💰 Hidden Wallet: ${this.playerStats.walletFound ? '✅ Found' : '❌ Not Found'}`);
        console.log(`👻 Ghost Trades: ${this.playerStats.ghostTrades}/3`);
        console.log(`🔮 Cursed Contracts: ${this.playerStats.cursedContractsFound}/5`);
        console.log(`🧟‍♂️ Zombies Resurrected: ${this.playerStats.zombiesResurrected}`);
        console.log(`🗝️ Crypto Crypt: ${this.playerStats.cryptoCryptUnlocked ? '🔓 Unlocked' : '🔒 Locked'}`);
        console.log("═".repeat(40));
    }
    
    triggerSpookyEvent() {
        const event = this.spookyEvents[Math.floor(Math.random() * this.spookyEvents.length)];
        console.log(`\n🎲 RANDOM SPOOKY EVENT:\n${event}`);
        
        // Random bonus
        const bonus = Math.floor(Math.random() * 20) + 5;
        this.playerStats.score += bonus;
        console.log(`\n✨ You gained ${bonus} spooky points!`);
    }
    
    async askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }
    
    async pressAnyKey() {
        return new Promise((resolve) => {
            this.rl.question('\nPress Enter to continue...', resolve);
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Start the game
if (require.main === module) {
    const game = new HalloweenHuntGame();
    game.startGame().catch(console.error);
}

module.exports = HalloweenHuntGame;