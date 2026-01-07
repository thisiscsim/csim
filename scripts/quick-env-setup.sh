#!/bin/bash

echo "🔐 Quick Environment Setup"
echo "========================="
echo ""
echo "Copy each value from 1Password when prompted."
echo ""

# Notion Configuration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 NOTION CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Notion API Key: " NOTION_API_KEY
read -p "Notion Database ID: " NOTION_DATABASE_ID

echo ""

# Bunny CDN Configuration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐰 BUNNY CDN CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Bunny Storage Zone: " BUNNY_STORAGE_ZONE
read -p "Bunny Storage API Key: " BUNNY_STORAGE_API_KEY
read -p "Bunny Storage Region (de/ny/la/sg/syd/uk) [de]: " BUNNY_STORAGE_REGION
BUNNY_STORAGE_REGION=${BUNNY_STORAGE_REGION:-de}
read -p "Bunny Pull Zone URL (e.g., yourzone.b-cdn.net): " BUNNY_PULL_ZONE_URL

echo ""

# Write to .env.local
cat > .env.local << EOF
# Notion Integration
NOTION_API_KEY=${NOTION_API_KEY}
NOTION_DATABASE_ID=${NOTION_DATABASE_ID}

# Bunny CDN Configuration
BUNNY_STORAGE_ZONE=${BUNNY_STORAGE_ZONE}
BUNNY_STORAGE_API_KEY=${BUNNY_STORAGE_API_KEY}
BUNNY_STORAGE_REGION=${BUNNY_STORAGE_REGION}
BUNNY_PULL_ZONE_URL=${BUNNY_PULL_ZONE_URL}
EOF

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Environment variables saved to .env.local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "You can now run: npm run dev"
