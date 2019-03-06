#!/usr/bin/env bash

pip install -r requirements.txt || exit 1

#echo "[run] make migrations"
#python3 manage.py makemigrations || exit 1

echo "[run] Migrate DB"
python3 manage.py migrate || exit 1

echo "[run] Collect static files"
python3 manage.py compress || exit 1

echo "[run] Collect static files"
python3 manage.py collectstatic --noinput
chmod -R 777 ./static

echo "[run] Create superuser"
echo "from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    user = User()
    user.first_name = 'Admin'
    user.last_name = 'Dev'
    user.is_superuser = True
    user.is_staff = True
    user.set_password('qwerty123')
    user.email = 'adminDjango@made2.co'
    user.save()

from django.contrib.auth.models import Group
if not Group.objects.filter(name='adminClub').exists():
	Group.objects.create(name='adminClub')

" | python3 manage.py shell || exit 1


gunicorn web.wsgi:application --bind 0.0.0.0:8000 --log-level=info --timeout=500