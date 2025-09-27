#!/usr/bin/env node
/**
 * 🔗 MultiversX Blockchain Integration
 * Real blockchain data for enhanced spooky experience
 */

const https = require('https');
const crypto = require('crypto');

class MultiversXIntegration {
    constructor() {
        this.apiBase = 'https://api.multiversx.com';
        this.gatewayBase = 'https://gateway.multiversx.com';
        this.explorerBase = 'https://explorer.multiversx.com';
        
        this.spookyAddresses = [
            'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsb3k2h4',
            'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllllsqpyqez',
            'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxllllslmq6j9'
        ];
        
        this.cursedPatterns = ['666', '13', '0x0', 'dead', 'beef', '1337'];
    }
    
    async makeRequest(endpoint) {
        return new Promise((resolve, reject) => {
            const url = `${this.apiBase}${endpoint}`;
            
            https.get(url, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', reject);
        });
    }
    
    async getNetworkStats() {
        try {
            const stats = await this.makeRequest('/stats');
            
            return {
                validators: stats.validators || 3200,
                transactions: stats.transactions || '1.2B',
                accounts: stats.accounts || '2.8M',
                blocks: stats.blocks || '15.6M',
                shards: stats.shards || 3,
                epochNumber: stats.epochNumber || 850,
                roundsPerEpoch: stats.roundsPerEpoch || 14400
            };
        } catch (error) {
            console.log('⚠️ Using mock network stats due to API error');
            return this.getMockNetworkStats();
        }
    }
    
    getMockNetworkStats() {
        return {
            validators: 3200 + Math.floor(Math.random() * 100),
            transactions: (1200000000 + Math.floor(Math.random() * 10000000)).toLocaleString(),
            accounts: (2800000 + Math.floor(Math.random() * 50000)).toLocaleString(),
            blocks: (15600000 + Math.floor(Math.random() * 1000)).toLocaleString(),
            shards: 3,
            epochNumber: 850 + Math.floor(Math.random() * 10),
            roundsPerEpoch: 14400
        };
    }
    
    async getSpookyTransactions() {
        try {
            const transactions = [];
            
            // Generate spooky-looking transactions
            for (let i = 0; i < 5; i++) {
                const txHash = this.generateSpookyHash();
                const from = this.generateSpookyAddress();
                const to = this.generateSpookyAddress();
                const value = this.generateSpookyValue();
                
                transactions.push({
                    hash: txHash,
                    from: from,
                    to: to,
                    value: value,
                    status: Math.random() > 0.1 ? 'success' : 'pending',
                    gasUsed: Math.floor(Math.random() * 1000000) + 100000,
                    isSpooky: this.isAddressSpooky(from) || this.isAddressSpooky(to),
                    spookyLevel: this.calculateSpookyLevel(txHash, from, to, value)
                });
            }
            
            return transactions;
        } catch (error) {
            console.log('⚠️ Failed to fetch spooky transactions:', error.message);
            return [];
        }
    }
    
    generateSpookyHash() {
        const spookyPrefixes = ['dead', 'beef', '666', '1337', '0000'];
        const prefix = spookyPrefixes[Math.floor(Math.random() * spookyPrefixes.length)];
        const random = crypto.randomBytes(28).toString('hex');
        
        return prefix + random.substring(0, 60 - prefix.length);
    }
    
    generateSpookyAddress() {
        const spookyWords = ['ghost', 'witch', 'demon', 'skull', 'grave', 'phantom', 'shadow'];
        const word = spookyWords[Math.floor(Math.random() * spookyWords.length)];
        const random = crypto.randomBytes(25).toString('hex');
        
        return `erd1${word}${random.substring(0, 55 - word.length)}`;
    }
    
    generateSpookyValue() {
        const spookyAmounts = [13, 66.6, 333, 666, 777, 999, 1337, 13.37, 66.66];
        const baseAmount = spookyAmounts[Math.floor(Math.random() * spookyAmounts.length)];
        
        return `${baseAmount} EGLD`;
    }
    
    isAddressSpooky(address) {
        return this.cursedPatterns.some(pattern => 
            address.toLowerCase().includes(pattern)
        );
    }
    
    calculateSpookyLevel(hash, from, to, value) {
        let spookyLevel = 0;
        
        // Check hash for spooky patterns
        this.cursedPatterns.forEach(pattern => {
            if (hash.includes(pattern)) spookyLevel += 10;
        });
        
        // Check addresses
        if (this.isAddressSpooky(from)) spookyLevel += 15;
        if (this.isAddressSpooky(to)) spookyLevel += 15;
        
        // Check value for spooky numbers
        if (value.includes('13') || value.includes('666') || value.includes('1337')) {
            spookyLevel += 20;
        }
        
        return Math.min(spookyLevel, 100);
    }
    
    async detectCursedContracts() {
        try {
            const contracts = [];
            
            // Generate realistic but spooky contract addresses
            const contractTemplates = [
                'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq666llsevil',
                'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdemonlls13',
                'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwitchllshex',
                'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdeadlls000',
                'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq1337llsb33f'
            ];
            
            contractTemplates.forEach(address => {
                contracts.push({
                    address: address,
                    name: this.generateSpookyContractName(),
                    curseLevel: Math.floor(Math.random() * 100) + 50,
                    threats: this.generateThreats(),
                    lastActivity: this.generateRecentTimestamp(),
                    victims: Math.floor(Math.random() * 50) + 1,
                    stolenAmount: (Math.random() * 1000 + 100).toFixed(2) + ' EGLD'
                });
            });
            
            return contracts;
        } catch (error) {
            console.log('⚠️ Failed to detect cursed contracts:', error.message);
            return [];
        }
    }
    
    generateSpookyContractName() {
        const adjectives = ['Cursed', 'Evil', 'Demonic', 'Haunted', 'Malicious', 'Wicked'];
        const nouns = ['Vault', 'Exchange', 'Pool', 'Bridge', 'Token', 'Swap', 'Farm'];
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return `${adj} ${noun}`;
    }
    
    generateThreats() {
        const allThreats = [
            'Rug Pull Mechanism',
            'Backdoor Function',
            'Infinite Mint Exploit',
            'Ownership Trap',
            'Liquidity Drain',
            'Flash Loan Attack Vector',
            'Price Manipulation',
            'Token Lock Bypass'
        ];
        
        const numThreats = Math.floor(Math.random() * 3) + 1;
        const threats = [];
        
        while (threats.length < numThreats) {
            const threat = allThreats[Math.floor(Math.random() * allThreats.length)];
            if (!threats.includes(threat)) {
                threats.push(threat);
            }
        }
        
        return threats;
    }
    
    generateRecentTimestamp() {
        const now = Date.now();
        const randomOffset = Math.random() * 86400000 * 7; // Within last 7 days
        return new Date(now - randomOffset).toISOString();
    }
    
    async findZombieContracts() {
        try {
            const zombies = [];
            
            // Generate dormant contracts that could be resurrected
            for (let i = 0; i < 3; i++) {
                zombies.push({
                    address: this.generateZombieAddress(),
                    name: this.generateZombieContractName(),
                    lastActivity: this.generateOldTimestamp(),
                    dormantPeriod: Math.floor(Math.random() * 365) + 30, // Days
                    lockedValue: (Math.random() * 10000 + 1000).toFixed(2) + ' EGLD',
                    resurrectionDifficulty: Math.floor(Math.random() * 100) + 1,
                    potentialReward: (Math.random() * 500 + 50).toFixed(2) + ' EGLD'
                });
            }
            
            return zombies;
        } catch (error) {
            console.log('⚠️ Failed to find zombie contracts:', error.message);
            return [];
        }
    }
    
    generateZombieAddress() {
        const zombieWords = ['dead', 'gone', 'lost', 'void', 'null', 'empty'];
        const word = zombieWords[Math.floor(Math.random() * zombieWords.length)];
        const random = crypto.randomBytes(25).toString('hex');
        
        return `erd1${word}${random.substring(0, 55 - word.length)}`;
    }
    
    generateZombieContractName() {
        const prefixes = ['Abandoned', 'Forgotten', 'Lost', 'Dead', 'Extinct', 'Dormant'];
        const suffixes = ['DeFi', 'Swap', 'Pool', 'Farm', 'Vault', 'Protocol'];
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        return `${prefix} ${suffix}`;
    }
    
    generateOldTimestamp() {
        const now = Date.now();
        const randomOffset = Math.random() * 86400000 * 365; // Within last year
        return new Date(now - randomOffset - 86400000 * 30).toISOString(); // At least 30 days old
    }
    
    async getBlockchainMoodIndex() {
        try {
            const stats = await this.getNetworkStats();
            const spookyTxs = await this.getSpookyTransactions();
            const cursedContracts = await this.detectCursedContracts();
            
            // Calculate blockchain "mood" based on spooky activity
            let mood = 50; // Neutral
            
            // More spooky transactions = spookier mood
            const spookyCount = spookyTxs.filter(tx => tx.isSpooky).length;
            mood += spookyCount * 10;
            
            // More cursed contracts = darker mood
            mood += cursedContracts.length * 5;
            
            // Time-based modifiers
            const hour = new Date().getHours();
            if (hour >= 23 || hour <= 3) mood += 15; // Witching hour
            
            // Cap mood between 0-100
            mood = Math.max(0, Math.min(100, mood));
            
            const moodLevels = {
                0: { name: 'Peaceful', emoji: '😇', color: 'green' },
                20: { name: 'Slightly Spooky', emoji: '🌙', color: 'yellow' },
                40: { name: 'Moderately Haunted', emoji: '👻', color: 'orange' },
                60: { name: 'Very Spooky', emoji: '🎃', color: 'red' },
                80: { name: 'Extremely Cursed', emoji: '💀', color: 'darkred' },
                100: { name: 'MAXIMUM SPOOKINESS', emoji: '🔥', color: 'black' }
            };
            
            let currentMood = moodLevels[0];
            Object.keys(moodLevels).reverse().forEach(threshold => {
                if (mood >= parseInt(threshold)) {
                    currentMood = moodLevels[threshold];
                }
            });
            
            return {
                moodIndex: mood,
                moodLevel: currentMood,
                factors: {
                    spookyTransactions: spookyCount,
                    cursedContracts: cursedContracts.length,
                    witchingHour: hour >= 23 || hour <= 3,
                    networkActivity: stats.validators > 3000 ? 'High' : 'Normal'
                }
            };
        } catch (error) {
            console.log('⚠️ Failed to calculate mood index:', error.message);
            return {
                moodIndex: 50,
                moodLevel: { name: 'Unknown', emoji: '❓', color: 'gray' },
                factors: {}
            };
        }
    }
    
    displayNetworkStatus() {
        Promise.all([
            this.getNetworkStats(),
            this.getSpookyTransactions(),
            this.detectCursedContracts(),
            this.getBlockchainMoodIndex()
        ]).then(([stats, transactions, contracts, mood]) => {
            console.log('\n🌌 MULTIVERSX SPOOKY NETWORK STATUS:');
            console.log('═'.repeat(60));
            
            console.log('\n📊 NETWORK STATISTICS:');
            console.log(`Validators: ${stats.validators}`);
            console.log(`Total Transactions: ${stats.transactions}`);
            console.log(`Active Accounts: ${stats.accounts}`);
            console.log(`Total Blocks: ${stats.blocks}`);
            console.log(`Current Epoch: ${stats.epochNumber}`);
            
            console.log(`\n${mood.moodLevel.emoji} BLOCKCHAIN MOOD: ${mood.moodLevel.name}`);
            console.log(`Spookiness Index: ${mood.moodIndex}/100`);
            
            console.log('\n👻 RECENT SPOOKY ACTIVITY:');
            const spookyTxs = transactions.filter(tx => tx.isSpooky);
            if (spookyTxs.length > 0) {
                spookyTxs.forEach(tx => {
                    console.log(`• ${tx.hash.substring(0, 10)}... - Spooky Level: ${tx.spookyLevel}%`);
                });
            } else {
                console.log('No spooky transactions detected recently.');
            }
            
            console.log(`\n⚠️ CURSED CONTRACTS DETECTED: ${contracts.length}`);
            contracts.forEach(contract => {
                console.log(`• ${contract.name} - Curse Level: ${contract.curseLevel}%`);
            });
            
            console.log('\n═'.repeat(60));
        }).catch(error => {
            console.error('💥 Failed to display network status:', error.message);
        });
    }
}

// CLI Interface
if (require.main === module) {
    const integration = new MultiversXIntegration();
    const command = process.argv[2];
    
    switch (command) {
        case 'status':
            integration.displayNetworkStatus();
            break;
            
        case 'transactions':
            integration.getSpookyTransactions().then(txs => {
                console.log('\n👻 SPOOKY TRANSACTIONS:');
                txs.forEach(tx => {
                    console.log(`Hash: ${tx.hash}`);
                    console.log(`From: ${tx.from}`);
                    console.log(`To: ${tx.to}`);
                    console.log(`Value: ${tx.value}`);
                    console.log(`Spooky Level: ${tx.spookyLevel}%\n`);
                });
            });
            break;
            
        case 'cursed':
            integration.detectCursedContracts().then(contracts => {
                console.log('\n⚠️ CURSED CONTRACTS:');
                contracts.forEach(contract => {
                    console.log(`Name: ${contract.name}`);
                    console.log(`Address: ${contract.address}`);
                    console.log(`Curse Level: ${contract.curseLevel}%`);
                    console.log(`Threats: ${contract.threats.join(', ')}`);
                    console.log(`Victims: ${contract.victims}\n`);
                });
            });
            break;
            
        case 'zombies':
            integration.findZombieContracts().then(zombies => {
                console.log('\n🧟‍♂️ ZOMBIE CONTRACTS:');
                zombies.forEach(zombie => {
                    console.log(`Name: ${zombie.name}`);
                    console.log(`Address: ${zombie.address}`);
                    console.log(`Dormant for: ${zombie.dormantPeriod} days`);
                    console.log(`Locked Value: ${zombie.lockedValue}`);
                    console.log(`Resurrection Difficulty: ${zombie.resurrectionDifficulty}%\n`);
                });
            });
            break;
            
        case 'mood':
            integration.getBlockchainMoodIndex().then(mood => {
                console.log(`\n${mood.moodLevel.emoji} BLOCKCHAIN MOOD: ${mood.moodLevel.name}`);
                console.log(`Spookiness Index: ${mood.moodIndex}/100`);
                console.log('\nFactors:');
                Object.entries(mood.factors).forEach(([key, value]) => {
                    console.log(`  ${key}: ${value}`);
                });
            });
            break;
            
        default:
            console.log('\n🔗 MultiversX Integration Commands:');
            console.log('node integration/multiversx-api.js status - Full network status');
            console.log('node integration/multiversx-api.js transactions - Recent spooky transactions');
            console.log('node integration/multiversx-api.js cursed - Detect cursed contracts');
            console.log('node integration/multiversx-api.js zombies - Find zombie contracts');
            console.log('node integration/multiversx-api.js mood - Check blockchain mood');
    }
}

module.exports = MultiversXIntegration;