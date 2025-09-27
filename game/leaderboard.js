#!/usr/bin/env node
/**
 * 🏆 SpookyChain Leaderboard System
 * Track top necromancers across the realm
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SpookyLeaderboard {
    constructor() {
        this.leaderboardFile = path.join(__dirname, 'data', 'leaderboard.json');
        this.achievementsFile = path.join(__dirname, 'data', 'achievements.json');
        this.ensureDataDirectory();
        this.loadLeaderboard();
    }
    
    ensureDataDirectory() {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }
    
    loadLeaderboard() {
        try {
            if (fs.existsSync(this.leaderboardFile)) {
                const data = fs.readFileSync(this.leaderboardFile, 'utf8');
                this.players = JSON.parse(data);
            } else {
                this.players = [];
                this.initializeWithLegends();
            }
        } catch (error) {
            console.log('🆕 Creating new leaderboard...');
            this.players = [];
            this.initializeWithLegends();
        }
    }
    
    initializeWithLegends() {
        // Add some legendary necromancers to start
        const legends = [
            {
                name: "Satoshi Ghostamoto",
                level: "Digital Ghost Master 👑",
                score: 9999,
                objectivesCompleted: 5,
                ghostTrades: 100,
                cursedContractsFound: 50,
                zombiesResurrected: 25,
                timestamp: Date.now() - 86400000 * 30, // 30 days ago
                achievements: ["First Blood", "Crypto Crypt Master", "Halloween Legend"]
            },
            {
                name: "Vitalik the Ethereal",
                level: "Blockchain Witch 🧙‍♀️",
                score: 8888,
                objectivesCompleted: 4,
                ghostTrades: 88,
                cursedContractsFound: 44,
                zombiesResurrected: 22,
                timestamp: Date.now() - 86400000 * 25,
                achievements: ["Smart Contract Summoner", "Gas Optimizer"]
            },
            {
                name: "The Phantom Trader",
                level: "Blockchain Witch 🧙‍♀️",
                score: 7777,
                objectivesCompleted: 4,
                ghostTrades: 77,
                cursedContractsFound: 35,
                zombiesResurrected: 15,
                timestamp: Date.now() - 86400000 * 20,
                achievements: ["Ghost Trade Master", "Midnight Warrior"]
            },
            {
                name: "Dr. DeFi Frankenstein",
                level: "Novice Necromancer 🎃",
                score: 6666,
                objectivesCompleted: 3,
                ghostTrades: 66,
                cursedContractsFound: 30,
                zombiesResurrected: 10,
                timestamp: Date.now() - 86400000 * 15,
                achievements: ["Zombie Resurrector", "Protocol Reanimator"]
            },
            {
                name: "Lady Lightning",
                level: "Novice Necromancer 🎃",
                score: 5555,
                objectivesCompleted: 2,
                ghostTrades: 55,
                cursedContractsFound: 25,
                zombiesResurrected: 8,
                timestamp: Date.now() - 86400000 * 10,
                achievements: ["Speed Demon", "Quick Draw"]
            }
        ];
        
        this.players = legends;
        this.saveLeaderboard();
    }
    
    addPlayer(playerStats) {
        // Create unique player entry
        const playerEntry = {
            ...playerStats,
            id: crypto.randomBytes(8).toString('hex'),
            timestamp: Date.now(),
            achievements: this.calculateAchievements(playerStats)
        };
        
        // Check if player already exists (by name)
        const existingIndex = this.players.findIndex(p => p.name === playerStats.name);
        
        if (existingIndex !== -1) {
            // Update existing player if new score is higher
            if (playerStats.score > this.players[existingIndex].score) {
                this.players[existingIndex] = {
                    ...this.players[existingIndex],
                    ...playerEntry,
                    achievements: [...new Set([...this.players[existingIndex].achievements, ...playerEntry.achievements])]
                };
                console.log(`🆙 Updated ${playerStats.name}'s record!`);
            } else {
                console.log(`📊 ${playerStats.name} didn't beat their previous score of ${this.players[existingIndex].score}`);
                return false;
            }
        } else {
            // Add new player
            this.players.push(playerEntry);
            console.log(`🆕 Welcome to the leaderboard, ${playerStats.name}!`);
        }
        
        // Sort by score (descending)
        this.players.sort((a, b) => b.score - a.score);
        
        this.saveLeaderboard();
        return true;
    }
    
    calculateAchievements(stats) {
        const achievements = [];
        
        // Score-based achievements
        if (stats.score >= 10000) achievements.push("🏆 Legendary Necromancer");
        else if (stats.score >= 5000) achievements.push("🥇 Master of Darkness");
        else if (stats.score >= 2000) achievements.push("🥈 Shadow Apprentice");
        else if (stats.score >= 1000) achievements.push("🥉 Novice Ghost");
        
        // Objective achievements
        if (stats.objectivesCompleted === 5) achievements.push("🎯 Perfect Completion");
        if (stats.walletFound) achievements.push("🔍 Wallet Hunter");
        if (stats.cryptoCryptUnlocked) achievements.push("🗝️ Crypt Master");
        
        // Trading achievements
        if (stats.ghostTrades >= 50) achievements.push("👻 Phantom Trading King");
        else if (stats.ghostTrades >= 20) achievements.push("💼 Ghost Trader");
        else if (stats.ghostTrades >= 10) achievements.push("📈 Spirit Investor");
        
        // Security achievements
        if (stats.cursedContractsFound >= 20) achievements.push("🛡️ Curse Detector Supreme");
        else if (stats.cursedContractsFound >= 10) achievements.push("🔍 Security Specialist");
        else if (stats.cursedContractsFound >= 5) achievements.push("⚠️ Danger Spotter");
        
        // Resurrection achievements
        if (stats.zombiesResurrected >= 10) achievements.push("⚰️ Necromancy Master");
        else if (stats.zombiesResurrected >= 5) achievements.push("🧟‍♂️ Zombie Whisperer");
        else if (stats.zombiesResurrected >= 1) achievements.push("🪦 First Resurrection");
        
        // Time-based achievements
        const hour = new Date().getHours();
        if (hour >= 23 || hour <= 3) achievements.push("🌙 Midnight Warrior");
        
        // Special achievements
        if (stats.name.toLowerCase().includes('ghost')) achievements.push("👻 Kindred Spirit");
        if (stats.name.toLowerCase().includes('witch')) achievements.push("🧙‍♀️ Magical Affinity");
        if (stats.name.toLowerCase().includes('crypto')) achievements.push("₿ Blockchain Native");
        
        return achievements;
    }
    
    displayLeaderboard(limit = 10) {
        console.log(`\n🏆 SPOOKYCHAIN LEADERBOARD - TOP ${limit} NECROMANCERS`);
        console.log("═".repeat(80));
        
        const topPlayers = this.players.slice(0, limit);
        
        topPlayers.forEach((player, index) => {
            const rank = index + 1;
            const medal = this.getRankMedal(rank);
            const timeAgo = this.getTimeAgo(player.timestamp);
            
            console.log(`\n${medal} #${rank} ${player.name}`);
            console.log(`   🎖️  Level: ${player.level}`);
            console.log(`   🎯 Score: ${player.score.toLocaleString()}`);
            console.log(`   ✅ Objectives: ${player.objectivesCompleted}/5`);
            console.log(`   👻 Ghost Trades: ${player.ghostTrades}`);
            console.log(`   🔍 Cursed Contracts: ${player.cursedContractsFound}`);
            console.log(`   ⚰️  Resurrections: ${player.zombiesResurrected}`);
            console.log(`   ⏰ Achieved: ${timeAgo}`);
            
            if (player.achievements && player.achievements.length > 0) {
                console.log(`   🏅 Achievements: ${player.achievements.slice(0, 3).join(', ')}`);
                if (player.achievements.length > 3) {
                    console.log(`      + ${player.achievements.length - 3} more...`);
                }
            }
        });
        
        console.log("\n═".repeat(80));
        console.log(`📊 Total Registered Necromancers: ${this.players.length}`);
        console.log(`🏆 Hall of Fame: ${this.players.filter(p => p.objectivesCompleted === 5).length} Masters`);
    }
    
    getRankMedal(rank) {
        switch (rank) {
            case 1: return "🥇";
            case 2: return "🥈";
            case 3: return "🥉";
            case 4: case 5: return "🏅";
            default: return "🎖️";
        }
    }
    
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }
    
    getPlayerRank(playerName) {
        const index = this.players.findIndex(p => p.name === playerName);
        return index !== -1 ? index + 1 : null;
    }
    
    getStats() {
        return {
            totalPlayers: this.players.length,
            masters: this.players.filter(p => p.objectivesCompleted === 5).length,
            witches: this.players.filter(p => p.objectivesCompleted >= 4).length,
            novices: this.players.filter(p => p.objectivesCompleted >= 2).length,
            averageScore: Math.round(this.players.reduce((sum, p) => sum + p.score, 0) / this.players.length),
            totalGhostTrades: this.players.reduce((sum, p) => sum + p.ghostTrades, 0),
            totalCursesFound: this.players.reduce((sum, p) => sum + p.cursedContractsFound, 0),
            totalResurrections: this.players.reduce((sum, p) => sum + p.zombiesResurrected, 0)
        };
    }
    
    saveLeaderboard() {
        try {
            fs.writeFileSync(this.leaderboardFile, JSON.stringify(this.players, null, 2));
        } catch (error) {
            console.error('Failed to save leaderboard:', error.message);
        }
    }
    
    exportLeaderboard() {
        const exportData = {
            exportDate: new Date().toISOString(),
            totalPlayers: this.players.length,
            leaderboard: this.players,
            stats: this.getStats()
        };
        
        const exportFile = path.join(__dirname, 'data', `leaderboard_export_${Date.now()}.json`);
        fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
        
        console.log(`📊 Leaderboard exported to: ${exportFile}`);
        return exportFile;
    }
}

// CLI Interface
if (require.main === module) {
    const leaderboard = new SpookyLeaderboard();
    const command = process.argv[2];
    
    switch (command) {
        case 'show':
            const limit = parseInt(process.argv[3]) || 10;
            leaderboard.displayLeaderboard(limit);
            break;
            
        case 'stats':
            const stats = leaderboard.getStats();
            console.log('\n📊 SPOOKYCHAIN STATISTICS:');
            console.log('═'.repeat(40));
            Object.entries(stats).forEach(([key, value]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                console.log(`${formattedKey}: ${value.toLocaleString()}`);
            });
            console.log('═'.repeat(40));
            break;
            
        case 'export':
            leaderboard.exportLeaderboard();
            break;
            
        case 'add':
            // Test adding a player
            const testPlayer = {
                name: process.argv[3] || 'Test Necromancer',
                level: 'Novice Necromancer 🎃',
                score: parseInt(process.argv[4]) || 1000,
                objectivesCompleted: 2,
                ghostTrades: 10,
                cursedContractsFound: 5,
                zombiesResurrected: 1,
                walletFound: true,
                cryptoCryptUnlocked: false
            };
            leaderboard.addPlayer(testPlayer);
            break;
            
        default:
            console.log('\n🎮 SpookyChain Leaderboard Commands:');
            console.log('node game/leaderboard.js show [limit] - Display leaderboard');
            console.log('node game/leaderboard.js stats - Show global statistics');
            console.log('node game/leaderboard.js export - Export leaderboard data');
            console.log('node game/leaderboard.js add [name] [score] - Add test player');
    }
}

module.exports = SpookyLeaderboard;