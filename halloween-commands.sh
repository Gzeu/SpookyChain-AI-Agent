#!/bin/bash
# 🎃 SpookyChain AI Agent - Halloween Easter Eggs
# Created by George Pricop (@Gzeu) - Digital Necromancer
# București, Romania 🇷🇴

echo "🎃" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "🎃"
echo "    SPOOKYCHAIN AI AGENT - HALLOWEEN EASTER EGGS"
echo "         Bonus Developer Commands Activated"
echo "🎃" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "🎃"
echo

# 🎄 Easter Egg #1: The witching hour - Check when GitHub journey began
echo "🌙 Casting spell to reveal GitHub birth date..."
echo "Command: curl -s 'https://api.github.com/users/Gzeu' | jq '.created_at'"
echo "Expected Result: '2021-12-24T01:19:20Z' - Born on Christmas Eve! 🎄"
echo

if command -v curl &> /dev/null && command -v jq &> /dev/null; then
    echo "🔮 Executing GitHub necromancy..."
    GITHUB_BIRTHDAY=$(curl -s "https://api.github.com/users/Gzeu" | jq -r '.created_at')
    echo "Result: $GITHUB_BIRTHDAY"
    
    # Check if it's Christmas Eve
    if [[ $GITHUB_BIRTHDAY == *"12-24"* ]]; then
        echo "✨ SPOOKY FACT: GitHub account was created on Christmas Eve! What a magical coincidence! 🎄🎁"
    fi
else
    echo "⚠️  curl or jq not found. Install them to execute this Easter egg!"
fi

echo
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# 👻 Easter Egg #2: Conjure the spirits of past commits
echo "👻 Summoning commit spirits containing 'agent'..."
echo "Command: git log --oneline --grep='agent' --graph --decorate --all"
echo

if command -v git &> /dev/null; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        echo "🕷️ Searching through the commit graveyard..."
        AGENT_COMMITS=$(git log --oneline --grep="agent" --graph --decorate --all | head -10)
        if [[ -n "$AGENT_COMMITS" ]]; then
            echo "$AGENT_COMMITS"
        else
            echo "😭 No agent-related commit spirits found in this repository..."
            echo "But that's okay - this IS the SpookyChain AI Agent repo! 🤖"
        fi
    else
        echo "⚠️  Not in a git repository. The commit spirits cannot be summoned here."
    fi
else
    echo "⚠️  git not found. Install it to commune with commit spirits!"
fi

echo
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# 🚀 Easter Egg #3: Build the future with blockchain sorcery
echo "🚀 Building the Web3 future with blockchain sorcery..."
echo "Command: npm run build-web3-future"
echo

if command -v npm &> /dev/null; then
    if [[ -f "package.json" ]]; then
        echo "🛠️  Activating blockchain construction spells..."
        npm run build-web3-future
    else
        echo "⚠️  package.json not found. Creating virtual spell..."
        echo "🚀 Building the decentralized future with blockchain sorcery..."
        echo "🛠️  Compiling spooky smart contracts..."
        echo "MultiversX contracts ready for haunting!"
    fi
else
    echo "⚠️  npm not found. Install Node.js to cast blockchain spells!"
fi

echo
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# 🤖 Easter Egg #4: Summon an AI agent from the digital realm
echo "🤖 Summoning AI agent from the digital realm..."
echo "Command: yarn create-ai-agent --theme=halloween --blockchain=multiversx"
echo

if command -v yarn &> /dev/null; then
    echo "🔮 Channeling yarn magic to create Halloween AI agent..."
    echo "yarn create-ai-agent --theme=halloween --blockchain=multiversx executed! 🎃"
    echo "✨ AI Agent summoned successfully with spooky powers!"
else
    echo "⚠️  yarn not found, using npm alternative..."
    if command -v npm &> /dev/null && [[ -f "package.json" ]]; then
        npm run create-ai-agent
    else
        echo "🤖 AI Agent creation spell cast! (Virtual execution)"
        echo "✨ Your Halloween-themed MultiversX AI agent is ready!"
    fi
fi

echo
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# 📈 Bonus: Display spooky profile stats
echo "📈 SPOOKY GITHUB PROFILE STATS:"
echo

if command -v curl &> /dev/null && command -v jq &> /dev/null; then
    PROFILE=$(curl -s "https://api.github.com/users/Gzeu")
    NAME=$(echo "$PROFILE" | jq -r '.name // "Unknown"')
    LOCATION=$(echo "$PROFILE" | jq -r '.location // "Unknown"')
    COMPANY=$(echo "$PROFILE" | jq -r '.company // "Unknown"')
    BIO=$(echo "$PROFILE" | jq -r '.bio // "No bio available"' | head -c 100)
    REPOS=$(echo "$PROFILE" | jq -r '.public_repos // 0')
    FOLLOWERS=$(echo "$PROFILE" | jq -r '.followers // 0')
    CREATED=$(echo "$PROFILE" | jq -r '.created_at // "Unknown"')
    
    echo "👤 Digital Necromancer: $NAME"
    echo "🏰 Haunted Location: $LOCATION"
    echo "🏢 Cursed Company: $COMPANY"
    echo "📜 Mystical Bio: $BIO..."
    echo "📚 Digital Grimoires (Repos): $REPOS"
    echo "👻 Followers (Spirits): $FOLLOWERS"
    echo "🎄 GitHub Birthday: $CREATED"
else
    echo "👤 Digital Necromancer: George Pricop"
    echo "🏰 Haunted Location: București, Romania 🇷🇴"
    echo "🏢 Cursed Company: Independent Developer"
    echo "📚 Digital Grimoires: 36+ repositories"
    echo "👻 Followers: Quality over quantity!"
    echo "🎄 GitHub Birthday: Christmas Eve 2021"
fi

echo
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="
echo
echo "🎃 HAPPY HALLOWEEN from your SpookyChain AI Agent! 🎃"
echo "👻 Built with blockchain necromancy and AI sorcery by George Pricop"
echo "✨ May your smart contracts be bug-free and your gas fees haunted-low! ✨"
echo
echo "Visit the haunted repository: https://github.com/Gzeu/SpookyChain-AI-Agent"
echo
