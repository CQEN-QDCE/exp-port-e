#!/bin/bash
echo 'avant Alembic upgrade...'
python3 -m alembic upgrade head
echo 'apres Alembic upgrade...'
if [ $? == 0 ]; then
    echo 'avant uvicorn...'
    exec uvicorn api.main:app --host 0.0.0.0 --port 5000 --log-level error --forwarded-allow-ips="*"
    echo 'apres uvicorn...'
fi
echo 'Alembic db upgrade failed...'
exit 1
