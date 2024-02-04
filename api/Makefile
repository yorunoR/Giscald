fmt:
	poetry run ruff format

lint:
	poetry run ruff check .

lint-fix:
	poetry run ruff check . --fix

run:
	poetry run python manage.py runserver 5000

test:
	poetry run python manage.py test

shell:
	poetry run python manage.py shell_plus

migrations:
	poetry run python manage.py makemigrations

showmigrations:
	poetry run python manage.py showmigrations

migrate:
	poetry run python manage.py migrate

rollback:
	poetry run python manage.py migrate ${app} ${to}

superuser:
	poetry run python manage.py createsuperuser
