#!/bin/bash

CONTAINER_NAME="sutlac-postgres"
DB_NAME="asdasd"

# insert_into.sql dosyasını PostgreSQL'e gönder
docker exec -i $CONTAINER_NAME psql -U asd -d $DB_NAME < insert_into.sql

echo "Tüm araçlar başarıyla eklendi!"