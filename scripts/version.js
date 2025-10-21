#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read package.json
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Get current version
const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Increment patch version
const newVersion = `${major}.${minor}.${patch + 1}`;

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`);

// Get git commit hash
try {
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const buildTime = new Date().toISOString().split('T')[0];
  
  console.log(`📦 Build: ${newVersion} (${commitHash})`);
  console.log(`📅 Date: ${buildTime}`);
  
  // Create .env.local with version info for local development
  const envContent = `NEXT_PUBLIC_APP_VERSION=${newVersion}
NEXT_PUBLIC_GIT_HASH=${commitHash}
NEXT_PUBLIC_BUILD_TIME=${buildTime}
`;
  
  fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
  console.log('✅ .env.local updated');
} catch (error) {
  console.warn('⚠️  Could not get git hash:', error.message);
}

