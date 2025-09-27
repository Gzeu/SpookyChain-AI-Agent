#!/usr/bin/env node
/**
 * 💾 SpookyChain Save System
 * Persistent game state management
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SpookySaveSystem {
    constructor() {
        this.saveDir = path.join(__dirname, 'saves');
        this.backupDir = path.join(__dirname, 'saves', 'backups');
        this.ensureSaveDirectories();
    }
    
    ensureSaveDirectories() {
        [this.saveDir, this.backupDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }
    
    generateSaveId(playerName) {
        const hash = crypto.createHash('md5').update(playerName.toLowerCase()).digest('hex');
        return hash.substring(0, 8);
    }
    
    getSaveFilePath(playerName) {
        const saveId = this.generateSaveId(playerName);
        return path.join(this.saveDir, `${saveId}_${playerName.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    }
    
    saveGame(playerStats, additionalData = {}) {
        try {
            const saveData = {
                version: '1.0.0',
                saveDate: new Date().toISOString(),
                player: playerStats,
                gameData: {
                    ...additionalData,
                    playTime: additionalData.playTime || 0,
                    lastPlayed: Date.now(),
                    gameVersion: '1.0.0-halloween'
                },
                achievements: this.calculateDetailedAchievements(playerStats),
                statistics: this.generateStatistics(playerStats)
            };
            
            const saveFile = this.getSaveFilePath(playerStats.name);
            
            // Create backup if save exists
            if (fs.existsSync(saveFile)) {
                this.createBackup(saveFile);
            }
            
            fs.writeFileSync(saveFile, JSON.stringify(saveData, null, 2));
            
            console.log(`💾 Game saved successfully for ${playerStats.name}!`);
            console.log(`📁 Save location: ${saveFile}`);
            
            return saveFile;
        } catch (error) {
            console.error('💥 Failed to save game:', error.message);
            return null;
        }
    }
    
    loadGame(playerName) {
        try {
            const saveFile = this.getSaveFilePath(playerName);
            
            if (!fs.existsSync(saveFile)) {
                console.log(`❌ No save file found for ${playerName}`);
                return null;
            }
            
            const saveData = JSON.parse(fs.readFileSync(saveFile, 'utf8'));
            
            console.log(`📂 Game loaded for ${playerName}!`);
            console.log(`💾 Last played: ${new Date(saveData.gameData.lastPlayed).toLocaleString()}`);
            console.log(`🏆 Level: ${saveData.player.level}`);
            console.log(`🎯 Score: ${saveData.player.score}`);
            
            return saveData;
        } catch (error) {
            console.error('💥 Failed to load game:', error.message);
            return null;
        }
    }
    
    createBackup(saveFile) {
        try {
            const fileName = path.basename(saveFile);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFile = path.join(this.backupDir, `${timestamp}_${fileName}`);
            
            fs.copyFileSync(saveFile, backupFile);
            console.log(`🔄 Backup created: ${backupFile}`);
        } catch (error) {
            console.error('⚠️ Failed to create backup:', error.message);
        }
    }
    
    listSaves() {
        try {
            const saves = fs.readdirSync(this.saveDir)
                .filter(file => file.endsWith('.json') && !file.startsWith('.'))
                .map(file => {
                    const filePath = path.join(this.saveDir, file);
                    const stats = fs.statSync(filePath);
                    
                    try {
                        const saveData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        return {
                            fileName: file,
                            playerName: saveData.player.name,
                            level: saveData.player.level,
                            score: saveData.player.score,
                            lastPlayed: new Date(saveData.gameData.lastPlayed),
                            fileSize: stats.size
                        };
                    } catch {
                        return null;
                    }
                })
                .filter(save => save !== null)
                .sort((a, b) => b.lastPlayed - a.lastPlayed);
            
            return saves;
        } catch (error) {
            console.error('💥 Failed to list saves:', error.message);
            return [];
        }
    }
    
    displaySaves() {
        const saves = this.listSaves();
        
        if (saves.length === 0) {
            console.log('📁 No save files found.');
            return;
        }
        
        console.log('\n💾 SAVED GAMES:');
        console.log('═'.repeat(80));
        
        saves.forEach((save, index) => {
            const timeAgo = this.getTimeAgo(save.lastPlayed.getTime());
            console.log(`\n${index + 1}. ${save.playerName}`);
            console.log(`   🏆 Level: ${save.level}`);
            console.log(`   🎯 Score: ${save.score.toLocaleString()}`);
            console.log(`   📅 Last Played: ${timeAgo}`);
            console.log(`   📁 File: ${save.fileName} (${(save.fileSize / 1024).toFixed(1)}KB)`);
        });
        
        console.log('\n═'.repeat(80));
        console.log(`📊 Total Saves: ${saves.length}`);
    }
    
    deleteSave(playerName) {
        try {
            const saveFile = this.getSaveFilePath(playerName);
            
            if (!fs.existsSync(saveFile)) {
                console.log(`❌ No save file found for ${playerName}`);
                return false;
            }
            
            // Create backup before deletion
            this.createBackup(saveFile);
            
            fs.unlinkSync(saveFile);
            console.log(`🗑️ Save file deleted for ${playerName}`);
            
            return true;
        } catch (error) {
            console.error('💥 Failed to delete save:', error.message);
            return false;
        }
    }
    
    exportSave(playerName) {
        try {
            const saveData = this.loadGame(playerName);
            if (!saveData) return null;
            
            const exportFile = path.join(__dirname, 'data', `export_${playerName}_${Date.now()}.json`);
            
            const exportData = {
                exportInfo: {
                    exportDate: new Date().toISOString(),
                    exportedBy: 'SpookyChain Save System',
                    version: '1.0.0'
                },
                saveData: saveData
            };
            
            fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));
            console.log(`📤 Save exported to: ${exportFile}`);
            
            return exportFile;
        } catch (error) {
            console.error('💥 Failed to export save:', error.message);
            return null;
        }
    }
    
    calculateDetailedAchievements(stats) {
        const achievements = [];
        
        // Basic completion achievements
        if (stats.objectivesCompleted >= 1) achievements.push({ id: 'first_objective', name: '🎯 First Steps', description: 'Complete your first objective' });
        if (stats.objectivesCompleted >= 3) achievements.push({ id: 'halfway_there', name: '🚀 Halfway There', description: 'Complete 3 objectives' });
        if (stats.objectivesCompleted === 5) achievements.push({ id: 'perfect_completion', name: '🏆 Perfect Completion', description: 'Complete all objectives' });
        
        // Trading achievements
        if (stats.ghostTrades >= 1) achievements.push({ id: 'first_ghost_trade', name: '👻 First Ghost Trade', description: 'Execute your first phantom transaction' });
        if (stats.ghostTrades >= 10) achievements.push({ id: 'ghost_trader', name: '💼 Ghost Trader', description: 'Execute 10 ghost trades' });
        if (stats.ghostTrades >= 50) achievements.push({ id: 'phantom_king', name: '👑 Phantom Trading King', description: 'Execute 50 ghost trades' });
        
        // Security achievements
        if (stats.cursedContractsFound >= 1) achievements.push({ id: 'curse_detector', name: '🔍 Curse Detector', description: 'Find your first cursed contract' });
        if (stats.cursedContractsFound >= 5) achievements.push({ id: 'security_expert', name: '🛡️ Security Expert', description: 'Detect 5 cursed contracts' });
        if (stats.cursedContractsFound >= 20) achievements.push({ id: 'curse_master', name: '🔮 Curse Master', description: 'Detect 20 cursed contracts' });
        
        // Resurrection achievements
        if (stats.zombiesResurrected >= 1) achievements.push({ id: 'necromancer', name: '⚰️ Necromancer', description: 'Resurrect your first zombie contract' });
        if (stats.zombiesResurrected >= 5) achievements.push({ id: 'zombie_master', name: '🧟‍♂️ Zombie Master', description: 'Resurrect 5 zombie contracts' });
        
        // Special achievements
        if (stats.walletFound) achievements.push({ id: 'wallet_hunter', name: '🔍 Wallet Hunter', description: 'Discover the hidden wallet' });
        if (stats.cryptoCryptUnlocked) achievements.push({ id: 'crypt_master', name: '🗝️ Crypt Master', description: 'Unlock the crypto crypt' });
        
        // Score-based achievements
        if (stats.score >= 1000) achievements.push({ id: 'score_1k', name: '🥉 Bronze Score', description: 'Reach 1,000 points' });
        if (stats.score >= 5000) achievements.push({ id: 'score_5k', name: '🥈 Silver Score', description: 'Reach 5,000 points' });
        if (stats.score >= 10000) achievements.push({ id: 'score_10k', name: '🥇 Golden Score', description: 'Reach 10,000 points' });
        
        return achievements;
    }
    
    generateStatistics(stats) {
        return {
            gamesPlayed: 1,
            totalPlayTime: 0,
            averageObjectivesPerGame: stats.objectivesCompleted,
            averageScorePerGame: stats.score,
            bestStreak: stats.objectivesCompleted,
            favoriteActivity: this.getFavoriteActivity(stats),
            efficiency: this.calculateEfficiency(stats)
        };
    }
    
    getFavoriteActivity(stats) {
        const activities = {
            'Ghost Trading': stats.ghostTrades,
            'Curse Detection': stats.cursedContractsFound,
            'Zombie Resurrection': stats.zombiesResurrected * 10 // Weight resurrections higher
        };
        
        return Object.entries(activities).reduce((a, b) => activities[a[0]] > activities[b[0]] ? a : b)[0];
    }
    
    calculateEfficiency(stats) {
        const totalActions = stats.ghostTrades + stats.cursedContractsFound + stats.zombiesResurrected;
        return totalActions > 0 ? Math.round((stats.score / totalActions) * 10) / 10 : 0;
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
}

// CLI Interface
if (require.main === module) {
    const saveSystem = new SpookySaveSystem();
    const command = process.argv[2];
    
    switch (command) {
        case 'list':
            saveSystem.displaySaves();
            break;
            
        case 'load':
            const playerName = process.argv[3];
            if (!playerName) {
                console.log('❌ Please provide a player name');
                console.log('Usage: node game/save-system.js load "Player Name"');
                break;
            }
            saveSystem.loadGame(playerName);
            break;
            
        case 'delete':
            const deletePlayer = process.argv[3];
            if (!deletePlayer) {
                console.log('❌ Please provide a player name');
                console.log('Usage: node game/save-system.js delete "Player Name"');
                break;
            }
            saveSystem.deleteSave(deletePlayer);
            break;
            
        case 'export':
            const exportPlayer = process.argv[3];
            if (!exportPlayer) {
                console.log('❌ Please provide a player name');
                console.log('Usage: node game/save-system.js export "Player Name"');
                break;
            }
            saveSystem.exportSave(exportPlayer);
            break;
            
        case 'test':
            // Create a test save
            const testStats = {
                name: 'Test Necromancer',
                level: 'Blockchain Witch 🧙‍♀️',
                score: 5000,
                objectivesCompleted: 4,
                ghostTrades: 25,
                cursedContractsFound: 15,
                zombiesResurrected: 3,
                walletFound: true,
                cryptoCryptUnlocked: false
            };
            saveSystem.saveGame(testStats, { playTime: 1800 }); // 30 minutes
            break;
            
        default:
            console.log('\n💾 SpookyChain Save System Commands:');
            console.log('node game/save-system.js list - List all saves');
            console.log('node game/save-system.js load "Player Name" - Load a save');
            console.log('node game/save-system.js delete "Player Name" - Delete a save');
            console.log('node game/save-system.js export "Player Name" - Export a save');
            console.log('node game/save-system.js test - Create test save');
    }
}

module.exports = SpookySaveSystem;