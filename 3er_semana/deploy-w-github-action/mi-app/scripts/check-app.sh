#!/bin/bash

echo "Checking app..."

curl -f http://localhost:3000/health && echo "OK health"
curl -f http://localhost:3000/db && echo "OK db"
curl -f http://localhost:3000/cache && echo "OK cache"