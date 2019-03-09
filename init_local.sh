#!/usr/bin/env bash
echo "[run] install requirements.txt"
pip install -r requirements.txt || exit 1
echo "[run] make migrations"
python3 manage.py makemigrations || exit 1
echo "[run] Migrate DB"
python3 manage.py migrate || exit 1

echo "[run] Create superuser"
# echo "from django.contrib.auth import get_user_model
# from apps.task.models import Task
# User = get_user_model()
# if not User.objects.filter(is_superuser=True).exists():
#     python3 manage.py loaddata /usr/src/app/fixtures/users.json || exit 1
#     if not Task.objects.exists():
#         python3 manage.py loaddata /usr/src/app/fixtures/tasks.json || exit 1
# " | python3 manage.py shell || exit 1

echo "[run] Create domain"
echo "
from django.contrib.sites.models import Site
site = Site.objects.first()
if site.domain != '0.0.0.0:8000':
    site.domain = '0.0.0.0:8000'
    site.save()
" | python3 manage.py shell || exit 1
echo "[run] Load Initial data"
#./manage.py dumpdata user --indent 4 > fixtures/users.json
python3 manage.py loaddata /usr/src/app/fixtures/users.json || exit 1
python3 manage.py loaddata /usr/src/app/fixtures/tasks.json || exit 1
echo "[run] runserver with django"
python3 manage.py runserver 0.0.0.0:8000
