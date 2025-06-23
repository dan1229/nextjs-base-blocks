#!/bin/bash

# Local CI validation script
# Run this before pushing to ensure CI will pass

set -e

echo "🚀 Running local CI validation..."

echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

echo "🔍 Running linting..."
npm run lint

echo "🏗️ Building project..."
npm run build

echo "📝 Checking TypeScript..."
npx tsc --noEmit

echo "🧪 Running Cypress component tests..."
npm run test

echo "✅ All checks passed! Ready to push to CI."
echo ""
echo "To run tests interactively: npm run test:open"
echo "To run individual tests: npx cypress run --component --spec 'cypress/component/bbbutton.cy.tsx'" 