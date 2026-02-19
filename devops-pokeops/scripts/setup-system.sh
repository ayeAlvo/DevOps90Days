#!/bin/bash

echo "🔴 Pokemon DevOps - Setup Sistema"
export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y curl wget git vim htop python3 python3-pip python3-venv

# Instalar NodeJS 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g npm@latest

echo "✅ Sistema configurado"