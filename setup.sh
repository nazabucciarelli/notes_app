#!/bin/bash

DB_USERNAME="$1"
DB_PASSWORD="$2"

if [ -z "$DB_USERNAME" ] || [ -z "$DB_PASSWORD" ]; then
    echo "Usage: $0 <DB_USERNAME> <DB_PASSWORD>"
    exit 1
fi

trap 'kill $(jobs -p)' SIGINT EXIT

# Run MySQL database
echo "Initializing MySQL Server..."
# Run SQL script to create the database schema
mysql -u "$DB_USERNAME" -p"$DB_PASSWORD" < "database/notes_app.sql"

# Run the backend
echo "Initializing backend..."
cd "./backend"
# Run the Spring Boot project
./mvnw clean package
java -Ddb.username="$DB_USERNAME" -Ddb.password="$DB_PASSWORD" -jar target/notes_app-0.0.1-SNAPSHOT.jar &

# Run the frontend
echo "Initializing frontend..."
cd "./../frontend"
# Install React project dependencies
npm install
# Run React project
npm start