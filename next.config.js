const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get git hash and version at build time
let gitHash = 'unknown';
let version = '0.1.0';
let buildTime = new Date().toISOString().split('T')[0];

try {
  gitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('Could not get git hash');
}

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  version = packageJson.version;
} catch (e) {
  console.warn('Could not read package.json version');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_GIT_HASH: gitHash,
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });
    }
    return config;
  }
}

module.exports = nextConfig
