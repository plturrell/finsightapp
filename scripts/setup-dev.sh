#!/bin/bash
set -e

echo "Setting up FinSight development environment..."

# Create development directories if needed
mkdir -p .vscode

# Create VSCode settings for consistent development
cat > .vscode/settings.json << EOL
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.rulers": [100],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.emmetCompletions": true
}
EOL

# Create VSCode launch configuration for debugging
cat > .vscode/launch.json << EOL
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
EOL

# Create sample .env.local file
cat > .env.local.example << EOL
# API Keys (replace with your actual keys in .env.local)
NEXT_PUBLIC_MARKET_DATA_API_KEY=your_api_key_here
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# Feature Flags
ENABLE_PORTFOLIO_FEATURE=true
ENABLE_ALERTS_FEATURE=false
EOL

# Create a .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "Created .env.local file from example"
fi

# Create .gitignore if it doesn't exist or append to it
if [ ! -f .gitignore ] || ! grep -q ".env.local" .gitignore; then
  echo "
# Local environment files
.env.local
.env.development.local
.env.test.local
.env.production.local

# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
" >> .gitignore
  echo "Updated .gitignore file"
fi

# Create .prettierrc
cat > .prettierrc << EOL
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "auto"
}
EOL

# Create .eslintrc.json if it doesn't exist
if [ ! -f .eslintrc.json ]; then
  cat > .eslintrc.json << EOL
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
EOL
  echo "Created .eslintrc.json"
fi

# Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier husky lint-staged

# Configure husky for git hooks
npx husky-init
npm pkg set scripts.prepare="husky install"
npx husky set .husky/pre-commit "npx lint-staged"

# Configure lint-staged
cat > .lintstagedrc.json << EOL
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
}
EOL

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Create script to create new feature branch
cat > scripts/create-feature.sh << EOL
#!/bin/bash
set -e

if [ -z "\$1" ]; then
  echo "Usage: ./scripts/create-feature.sh <feature-name>"
  exit 1
fi

FEATURE_NAME=\$1
BRANCH_NAME="feature/\$FEATURE_NAME"

# Make sure we're on the development branch
git checkout development
git pull origin development

# Create and switch to the feature branch
git checkout -b \$BRANCH_NAME

echo "Created and switched to branch: \$BRANCH_NAME"
echo "After making changes, push with: git push -u origin \$BRANCH_NAME"
EOL
chmod +x scripts/create-feature.sh

echo "Development environment setup complete!"
echo "To start development:"
echo "  1. Run 'npm install' to install dependencies"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. To create a new feature branch, run: ./scripts/create-feature.sh <feature-name>"