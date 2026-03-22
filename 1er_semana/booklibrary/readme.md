# Se crear un script de automatización completo que despliegue una aplicación Flask usando Gunicorn como servidor WSGI y Nginx como proxy inverso!

# 📚 Book Library — Despliegue con Vagrant + Gunicorn + Nginx

Este proyecto despliega una aplicación **Flask** utilizando:

- **Vagrant** (máquina virtual Ubuntu)
- **Gunicorn** (servidor WSGI para producción)
- **Nginx** (proxy inverso)
- **Script automatizado** `desplegar_app.sh`

El objetivo es levantar la aplicación de forma sencilla en un entorno controlado.

---

## 🚀 1. Requisitos previos en tu host

- **Vagrant** instalado  
- **VirtualBox** *(compatible ARM si estás en Mac M1/M2/M3)*  
- Git instalado

---

## 🧰 2. Iniciar la máquina virtual

Desde el directorio del proyecto:

```bash
vagrant up
vagrant ssh
cd /vagrant
./desplegar_app.sh
```