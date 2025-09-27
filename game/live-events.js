#!/usr/bin/env node
/**
 * 🌙 SpookyChain Live Events System
 * Real-time spooky events and blockchain integration
 */

const EventEmitter = require('events');
const https = require('https');

class SpookyLiveEvents extends EventEmitter {
    constructor() {
        super();
        this.events = [];
        this.isActive = false;
        this.eventInterval = null;
        this.moonPhase = this.calculateMoonPhase();
        this.spookyMultiplier = 1.0;
        
        this.setupEventTypes();
    }
    
    setupEventTypes() {
        this.eventTypes = {
            GHOST_SIGHTING: {
                probability: 0.15,
                title: "👻 Ghost Sighting",
                effects: { scoreMultiplier: 1.2, duration: 30000 },
                messages: [
                    "A phantom trader appears in the mempool...",
                    "Ghostly whispers echo through the blockchain...",
                    "A spectral transaction materializes..."
                ]
            },
            
            BAT_SWARM: {
                probability: 0.12,
                title: "🦇 Bat Swarm",
                effects: { luckBoost: 0.25, duration: 45000 },
                messages: [
                    "A swarm of crypto bats fills the terminal!",
                    "Vampire bats bring good fortune...",
                    "Wings of darkness grant enhanced luck!"
                ]
            },
            
            SPIDER_WEB: {
                probability: 0.10,
                title: "🕷️ Spider's Web",
                effects: { networkAnalysisBoost: true, duration: 60000 },
                messages: [
                    "A spider weaves connections across the network...",
                    "Web of transactions becomes visible...",
                    "Hidden patterns emerge in the blockchain..."
                ]
            },
            
            FULL_MOON: {
                probability: this.moonPhase > 0.8 ? 0.20 : 0.05,
                title: "🌕 Full Moon Blessing",
                effects: { resurrectionBoost: 2.0, allBonus: 1.5, duration: 120000 },
                messages: [
                    "The full moon amplifies all necromantic powers!",
                    "Lunar energy surges through the blockchain...",
                    "Ancient magic awakens under the moon..."
                ]
            },
            
            LIGHTNING_STRIKE: {
                probability: 0.08,
                title: "⚡ Lightning Strike",
                effects: { gasFeeReduction: 0.5, speedBoost: 2.0, duration: 20000 },
                messages: [
                    "Lightning strikes the blockchain!",
                    "Electricity surges through the network!",
                    "Gas fees are struck down by lightning!"
                ]
            },
            
            WITCH_ENCOUNTER: {
                probability: 0.07,
                title: "🧙‍♀️ Witch Encounter",
                effects: { wisdomBoost: true, hintRevealed: true, duration: 90000 },
                messages: [
                    "A blockchain witch appears with ancient wisdom...",
                    "Magical knowledge is shared...",
                    "Secret smart contract spells revealed!"
                ]
            },
            
            ZOMBIE_OUTBREAK: {
                probability: 0.06,
                title: "🧟‍♂️ Zombie Outbreak",
                effects: { zombieBonus: 3.0, chaosMode: true, duration: 180000 },
                messages: [
                    "Dead contracts rise from the blockchain graveyard!",
                    "Zombie outbreak detected in the network!",
                    "The undead code walks among us..."
                ]
            },
            
            MARKET_GHOST: {
                probability: 0.09,
                title: "📈 Market Ghost",
                effects: { marketInsight: true, tradingBonus: 1.3, duration: 75000 },
                messages: [
                    "A ghostly trader shares market secrets...",
                    "Phantom price movements become visible...",
                    "The spirit of Satoshi whispers wisdom..."
                ]
            },
            
            CURSE_STORM: {
                probability: 0.05,
                title: "🌩️ Curse Storm",
                effects: { curseDetectionBoost: 3.0, dangerMode: true, duration: 100000 },
                messages: [
                    "A storm of malicious contracts approaches!",
                    "Dark magic swirls through the network...",
                    "Cursed code rains from digital clouds..."
                ]
            },
            
            PUMPKIN_PATCH: {
                probability: this.isHalloweenSeason() ? 0.15 : 0.03,
                title: "🎃 Pumpkin Patch",
                effects: { halloweenBonus: 2.0, allObjectiveBoost: true, duration: 300000 },
                messages: [
                    "A magical pumpkin patch appears!",
                    "Halloween magic fills the blockchain!",
                    "Jack-o'-lanterns light the way to victory!"
                ]
            }
        };
    }
    
    startLiveEvents(intervalMs = 45000) {
        if (this.isActive) {
            console.log('⚠️ Live events already active!');
            return;
        }
        
        this.isActive = true;
        console.log('🌙 Starting SpookyChain Live Events...');
        console.log('✨ Supernatural occurrences will manifest randomly!');
        
        this.eventInterval = setInterval(() => {
            this.checkForEvent();
        }, intervalMs);
        
        // Immediate first event
        setTimeout(() => this.checkForEvent(), 5000);
    }
    
    stopLiveEvents() {
        if (!this.isActive) {
            console.log('⚠️ Live events not active!');
            return;
        }
        
        this.isActive = false;
        clearInterval(this.eventInterval);
        console.log('🌑 Live events stopped. The spirits rest...');
    }
    
    checkForEvent() {
        if (!this.isActive) return;
        
        const shouldTriggerEvent = Math.random() < this.calculateEventProbability();
        
        if (shouldTriggerEvent) {
            this.triggerRandomEvent();
        }
    }
    
    calculateEventProbability() {
        let baseProbability = 0.25; // 25% base chance
        
        // Time-based modifiers
        const hour = new Date().getHours();
        if (hour >= 23 || hour <= 3) baseProbability *= 1.5; // Witching hour
        if (this.isHalloweenSeason()) baseProbability *= 2.0; // Halloween season
        
        // Moon phase modifier
        baseProbability *= (1 + this.moonPhase * 0.5);
        
        return Math.min(baseProbability, 0.8); // Cap at 80%
    }
    
    triggerRandomEvent() {
        const eventKeys = Object.keys(this.eventTypes);
        const weights = eventKeys.map(key => this.eventTypes[key].probability);
        const selectedEvent = this.weightedRandomSelect(eventKeys, weights);
        
        this.executeEvent(selectedEvent);
    }
    
    executeEvent(eventType) {
        const event = this.eventTypes[eventType];
        const message = event.messages[Math.floor(Math.random() * event.messages.length)];
        
        const eventData = {
            type: eventType,
            title: event.title,
            message: message,
            effects: event.effects,
            timestamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9)
        };
        
        this.events.push(eventData);
        
        // Display event
        console.log(`\n🎆 LIVE EVENT TRIGGERED!`);
        console.log(`${event.title}`);
        console.log(`💬 ${message}`);
        
        // Show effects
        if (event.effects.scoreMultiplier) {
            console.log(`🎯 Score multiplier: x${event.effects.scoreMultiplier}`);
        }
        if (event.effects.luckBoost) {
            console.log(`🍀 Luck boost: +${(event.effects.luckBoost * 100)}%`);
        }
        if (event.effects.gasFeeReduction) {
            console.log(`⚡ Gas fees reduced by ${(event.effects.gasFeeReduction * 100)}%`);
        }
        if (event.effects.duration) {
            console.log(`⏰ Duration: ${Math.round(event.effects.duration / 1000)}s`);
        }
        
        // Emit event for game integration
        this.emit('spookyEvent', eventData);
        
        // Schedule event end
        if (event.effects.duration) {
            setTimeout(() => {
                this.endEvent(eventData.id);
            }, event.effects.duration);
        }
    }
    
    endEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            console.log(`\n🌫️ ${event.title} effect has ended...`);
            this.emit('eventEnded', event);
        }
    }
    
    weightedRandomSelect(items, weights) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }
        
        return items[items.length - 1];
    }
    
    calculateMoonPhase() {
        // Simplified moon phase calculation
        const now = new Date();
        const newMoon = new Date('2023-10-14'); // Reference new moon
        const daysSinceNewMoon = (now - newMoon) / (1000 * 60 * 60 * 24);
        const cycle = daysSinceNewMoon % 29.53; // Lunar cycle
        
        // Convert to 0-1 where 1 is full moon
        return Math.abs(Math.cos((cycle / 29.53) * 2 * Math.PI));
    }
    
    isHalloweenSeason() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-based month
        const day = now.getDate();
        
        return (month === 10 && day >= 15) || (month === 11 && day <= 7);
    }
    
    isWitchingHour() {
        const hour = new Date().getHours();
        return hour >= 23 || hour <= 3;
    }
    
    getActiveEvents() {
        const now = Date.now();
        return this.events.filter(event => {
            const eventAge = now - event.timestamp;
            return eventAge < (event.effects.duration || 60000);
        });
    }
    
    getCurrentMultipliers() {
        const activeEvents = this.getActiveEvents();
        let multipliers = {
            score: 1.0,
            luck: 1.0,
            resurrection: 1.0,
            trading: 1.0,
            curseDetection: 1.0
        };
        
        activeEvents.forEach(event => {
            if (event.effects.scoreMultiplier) multipliers.score *= event.effects.scoreMultiplier;
            if (event.effects.luckBoost) multipliers.luck *= (1 + event.effects.luckBoost);
            if (event.effects.resurrectionBoost) multipliers.resurrection *= event.effects.resurrectionBoost;
            if (event.effects.tradingBonus) multipliers.trading *= event.effects.tradingBonus;
            if (event.effects.curseDetectionBoost) multipliers.curseDetection *= event.effects.curseDetectionBoost;
        });
        
        return multipliers;
    }
    
    displayEventStatus() {
        const activeEvents = this.getActiveEvents();
        const multipliers = this.getCurrentMultipliers();
        
        console.log('\n🌙 LIVE EVENT STATUS:');
        console.log('═'.repeat(50));
        console.log(`🌕 Moon Phase: ${(this.moonPhase * 100).toFixed(1)}%`);
        console.log(`🎃 Halloween Season: ${this.isHalloweenSeason() ? 'Yes' : 'No'}`);
        console.log(`🌙 Witching Hour: ${this.isWitchingHour() ? 'Active' : 'Inactive'}`);
        
        if (activeEvents.length > 0) {
            console.log(`\n✨ ACTIVE EVENTS (${activeEvents.length}):`);
            activeEvents.forEach(event => {
                const timeLeft = Math.max(0, (event.timestamp + event.effects.duration - Date.now()) / 1000);
                console.log(`${event.title} - ${Math.round(timeLeft)}s remaining`);
            });
            
            console.log('\n🎯 CURRENT MULTIPLIERS:');
            Object.entries(multipliers).forEach(([key, value]) => {
                if (value !== 1.0) {
                    console.log(`${key}: x${value.toFixed(2)}`);
                }
            });
        } else {
            console.log('\n🌑 No active events - the spirits are quiet...');
        }
        
        console.log('═'.repeat(50));
    }
    
    // Integration with external blockchain data
    async fetchRealMarketData() {
        try {
            // This would integrate with real APIs in production
            const mockData = {
                egldPrice: 45.67 + (Math.random() - 0.5) * 10,
                marketCap: '1.2B',
                volume24h: '45M',
                fearGreedIndex: Math.floor(Math.random() * 100),
                activeValidators: 3200 + Math.floor(Math.random() * 100)
            };
            
            return mockData;
        } catch (error) {
            console.log('⚠️ Failed to fetch market data:', error.message);
            return null;
        }
    }
    
    async triggerMarketBasedEvent() {
        const marketData = await this.fetchRealMarketData();
        if (!marketData) return;
        
        // Trigger events based on real market conditions
        if (marketData.fearGreedIndex < 25) {
            this.executeEvent('CURSE_STORM');
        } else if (marketData.fearGreedIndex > 75) {
            this.executeEvent('PUMPKIN_PATCH');
        }
        
        if (marketData.egldPrice > 50) {
            this.executeEvent('MARKET_GHOST');
        }
    }
}

// CLI Interface
if (require.main === module) {
    const liveEvents = new SpookyLiveEvents();
    const command = process.argv[2];
    
    // Event listeners for demo
    liveEvents.on('spookyEvent', (event) => {
        // Could integrate with main game here
    });
    
    switch (command) {
        case 'start':
            const interval = parseInt(process.argv[3]) || 30000;
            liveEvents.startLiveEvents(interval);
            
            // Keep process alive
            console.log('🎃 Press Ctrl+C to stop live events');
            process.on('SIGINT', () => {
                liveEvents.stopLiveEvents();
                process.exit(0);
            });
            break;
            
        case 'status':
            liveEvents.displayEventStatus();
            break;
            
        case 'trigger':
            const eventType = process.argv[3];
            if (eventType && liveEvents.eventTypes[eventType.toUpperCase()]) {
                liveEvents.executeEvent(eventType.toUpperCase());
            } else {
                liveEvents.triggerRandomEvent();
            }
            break;
            
        case 'market':
            liveEvents.triggerMarketBasedEvent();
            break;
            
        default:
            console.log('\n🌙 SpookyChain Live Events Commands:');
            console.log('node game/live-events.js start [interval] - Start live events');
            console.log('node game/live-events.js status - Show event status');
            console.log('node game/live-events.js trigger [type] - Trigger specific event');
            console.log('node game/live-events.js market - Trigger market-based event');
            console.log('\nAvailable event types:');
            Object.keys(liveEvents.eventTypes).forEach(type => {
                console.log(`  - ${type.toLowerCase()}`);
            });
    }
}

module.exports = SpookyLiveEvents;