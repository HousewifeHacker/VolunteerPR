#!/bin/bash
set -euo pipefail

cd src/
postgres_ready() {
    python manage.py shell << END
import sys
import psycopg2
from django.db import connections
try:
  connections['default'].cursor()
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
      >&2 echo "==> Waiting for Postgres..."
      sleep 1
    done

case "$1" in
  "dev_start")
    echo "==> Running migrations..."
    python manage.py collectstatic --noinput
    python manage.py makemigrations
    python manage.py migrate

    echo "==> Loading initial data..."
    #python manage.py loaddata langmonster/languages/fixtures/initial.json

    echo "==> Running dev server..."
    python manage.py runserver_plus 0.0.0.0:8123
    ;;

  "run_tests")
      echo "==> Running py.test..."
      py.test "${@:2}"
      ;;

  "flake8")
      echo "==> Running flake8..."
      flake8 "${@:2}"
      ;;

  "black")
      echo "==> Running flake8..."
      black --check langmonster --check tests "${@:2}"
      ;;
  *)
    exec "$@"
    ;;
esac
