#!/usr/bin/env sh

# abort on errors
set -e

# build
npm install
npm run build

# navigate into the build output directory
cd public

git init
git add -A
git commit -m 'deploy'

# Push to build branch
git push -f git@github.com:org/repo.git build

cd -