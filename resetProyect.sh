# Borra las migraciones se borra la BD y se levanta nuevamente
docker-compose down

find . -path "*/migrations/*.py" -not -name "__init__.py" -delete

find . -path "*/migrations/*.pyc" -delete

docker volume prune --force

docker-compose -f deploy_local.yml up
