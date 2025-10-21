#!/bin/bash

echo "🚀 Starting deployment process..."
echo ""

# Bump version
echo "📦 Bumping version..."
node scripts/version.js

if [ $? -ne 0 ]; then
  echo "❌ Version bump failed!"
  exit 1
fi

echo ""

# Get new version
VERSION=$(node -p "require('./package.json').version")
echo "✅ New version: $VERSION"
echo ""

# Git add, commit and push
echo "📝 Committing changes..."
git add package.json

if git diff --cached --quiet; then
  echo "⚠️  No changes to commit"
else
  git commit -m "Bump version to $VERSION"
  echo "✅ Version committed"
fi

echo ""
echo "🔄 Pushing to GitHub..."
git push origin new-ui

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment initiated!"
  echo "📊 Version: $VERSION"
  echo "🌐 Check Vercel for build status"
else
  echo "❌ Push failed!"
  exit 1
fi

