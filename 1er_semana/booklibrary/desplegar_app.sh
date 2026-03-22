#!/bin/bash

APP_DIR="/home/vagrant/app"
LOG="logs_despliegue.txt"

instalar_dependencias() {
  echo "Instalando dependencias..." | tee -a $LOG
  sudo apt update -y >> $LOG 2>&1
  sudo apt install -y python3 python3-venv python3-pip nginx >> $LOG 2>&1

  sudo systemctl enable nginx >> $LOG 2>&1
  sudo systemctl start nginx >> $LOG 2>&1
}

configurar_entorno() {
  echo "Configurando entorno virtual..." | tee -a $LOG

  cd $APP_DIR

  # Si existe el venv viejo, lo borro
  rm -rf venv

  python3 -m venv venv
  source venv/bin/activate

  pip install --upgrade pip >> $LOG 2>&1
  pip install -r requirements.txt >> $LOG 2>&1
  pip install gunicorn >> $LOG 2>&1
}

configurar_gunicorn() {
  echo "Iniciando Gunicorn..." | tee -a $LOG
  cd $APP_DIR

  # Matar instancias previas
  pkill -f "gunicorn.*library_site" 2>/dev/null

  nohup venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 library_site:app >> $LOG 2>&1 &
  sleep 3
}

configurar_nginx() {
  echo "Configurando Nginx..." | tee -a $LOG

  sudo rm -f /etc/nginx/sites-enabled/default
  sudo rm -f /etc/nginx/sites-available/booklibrary

  sudo tee /etc/nginx/sites-available/booklibrary > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /static/ {
        alias $APP_DIR/static/;
        expires 30d;
    }

    access_log /var/log/nginx/booklibrary_access.log;
    error_log /var/log/nginx/booklibrary_error.log;
}
EOF

  sudo ln -sf /etc/nginx/sites-available/booklibrary /etc/nginx/sites-enabled/

  sudo nginx -t >> $LOG 2>&1
  sudo systemctl reload nginx
}

verificar_servicios() {
  echo "Verificando servicios..." | tee -a $LOG

  if systemctl is-active --quiet nginx; then echo "✓ Nginx está activo"; else echo "✗ Nginx no está activo"; fi

  if pgrep -f "gunicorn.*library_site" >/dev/null; then echo "✓ Gunicorn está corriendo"; else echo "✗ Gunicorn no está corriendo"; fi

  if ss -tln | grep -q ":8000"; then echo "✓ Puerto 8000 en escucha"; else echo "✗ Puerto 8000 NO está en escucha"; fi

  if curl -s http://127.0.0.1:8000 >/dev/null; then echo "✓ Gunicorn responde correctamente"; else echo "✗ Gunicorn NO responde"; fi
}

main() {
  echo "=== Iniciando despliegue de Book Library ===" | tee $LOG
  instalar_dependencias
  configurar_entorno
  configurar_gunicorn
  configurar_nginx
  verificar_servicios

  echo "=== Despliegue finalizado ===" | tee -a $LOG
  echo "La aplicación debería estar en: http://$(hostname -I | awk '{print $1}')" | tee -a $LOG
}

main