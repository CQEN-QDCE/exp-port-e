DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_USER=
DATABASE_HOST=
DATABASE_PORT=

FILENAME=backup-${DATABASE_NAME}-`date +%Y-%m-%d_%H%M%S`.sql.gz;
PGPASSWORD="$DATABASE_PASSWORD" /usr/bin/pg_dump --username=$DATABASE_USER --host=$DATABASE_HOST --port=$DATABASE_PORT --column-inserts --clean --create ${DATABASE_NAME} | gzip > /var/lib/pgsql/backup_script/database-backup/$FILENAME; 
