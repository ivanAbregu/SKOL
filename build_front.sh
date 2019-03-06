docker-compose -f deploy_local.yml run --rm frontend npm run --prefix ./frontend build

git add -f assets/*