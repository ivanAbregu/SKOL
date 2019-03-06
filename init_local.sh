#!/usr/bin/env bash
echo "[run] install requirements.txt"
pip install -r requirements.txt || exit 1
echo "[run] make migrations"
python3 manage.py makemigrations || exit 1
echo "[run] Migrate DB"
python3 manage.py migrate || exit 1

echo "[run] Create superuser"
echo "from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    user = User()
    user.first_name = 'Admin'
    user.last_name = 'Dev'
    user.is_superuser = True
    user.is_staff = True
    user.set_password('qwqw1212')
    user.email = 'admin@gmail.com'
    user.save()
" | python3 manage.py shell || exit 1

echo "[run] Create domain"
echo "
from django.contrib.sites.models import Site
site = Site.objects.first()
if site.domain != '0.0.0.0:8000':
    site.domain = '0.0.0.0:8000'
    site.save()
# from django.contrib.auth.models import Group
# if not Group.objects.filter(name='adminClub').exists():
# 	Group.objects.create(name='adminClub')
" | python3 manage.py shell || exit 1
# echo "[run] Load Initial data"

# python3 manage.py loaddata /usr/src/app/fixtures/clubs.json || exit 1
# python3 manage.py loaddata /usr/src/app/fixtures/users.json || exit 1
# python3 manage.py loaddata /usr/src/app/fixtures/roles.json || exit 1
# python3 manage.py loaddata /usr/src/app/fixtures/personalRecords.json || exit 1

# python3 manage.py loaddata /usr/src/app/fixtures/tasks.json || exit 1
# python3 manage.py loaddata /usr/src/app/fixtures/task_events.json || exit 1
# python3 manage.py loaddata /usr/src/app/fixtures/healths.json || exit 1

echo "[run] runserver with django"
python3 manage.py runserver 0.0.0.0:8000
