#!/bin/bash

echo "🔐 Quick Environment Setup"
echo "========================="
echo ""
echo "Copy your environment variables from 1Password and paste them below."
echo "When done, press Ctrl+D (Mac) or Ctrl+Z then Enter (Windows):"
echo ""

# Create .env.local from pasted content
cat > .env.local

echo ""
echo "✅ Environment variables saved to .env.local"
echo ""
echo "You can now run: npm run dev" 