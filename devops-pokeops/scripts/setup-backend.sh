#!/bin/bash

echo "🐍 Setup Backend"

# Crear VENV centralizado
if [ ! -d "/home/vagrant/pokemon-env" ]; then
    python3 -m venv /home/vagrant/pokemon-env
fi

source /home/vagrant/pokemon-env/bin/activate

cd /vagrant/backend
pip install -r requirements.txt

echo "✅ Backend configurado"