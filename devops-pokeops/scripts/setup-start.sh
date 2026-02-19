#!/bin/bash

echo "🚀 Iniciando servicios automáticamente..."

mkdir -p /home/vagrant/logs


echo "🐍 Iniciando backend..."

source /home/vagrant/pokemon-env/bin/activate
cd /vagrant/backend

# Backend en background con logs
nohup python -m uvicorn main:app --host 0.0.0.0 --port 8080 \
    > /home/vagrant/logs/backend.log 2>&1 &

sleep 5


echo "⚛️ Iniciando frontend..."

cd /vagrant/frontend
export HOST=0.0.0.0
export BROWSER=none

nohup npm start > /home/vagrant/logs/frontend.log 2>&1 &

sleep 10


echo "🔄 Reiniciando Nginx..."
sudo systemctl restart nginx

echo "✅ Servicios iniciados!"
echo "🌐 Acceso: http://192.168.56.10"