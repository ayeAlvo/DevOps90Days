# DevOps90Days

Repositorio principal del proyecto DevOps90Days, donde voy documentando y construyendo distintos proyectos prácticos para aprender y aplicar herramientas del ecosistema DevOps.

La idea de este repositorio es centralizar distintos proyectos pequeños y medianos que van incorporando progresivamente herramientas como:

- Docker

- Nginx

- Ansible

- CI/CD

- Infraestructura como código

- Automatización

- despliegues

Algunos proyectos son ejercicios individuales y otros forman parte de un proyecto principal que se va completando progresivamente.

---

## 📂 Estructura del Repositorio DevOps90Days
```
DevOps90Days/
│
├── 🛠️ importar_rama.sh          
│   └── Script para importar Ramas sin clonar .git
│
├── 🎮 devops-pokeops/           
│   └── Proyecto 1 — PokéAPI + Flask
│
├── 📚 booklibrary/              
│   └── Proyecto 2 — Biblioteca + Gunicorn + Nginx
│
└── 🖥️ freelancer-deploy/        
|   └── Proyecto 3 — StartBootstrap + Nginx + Ansible + Vagrant
│
├── portfolio/
│   └── Proyecto 4 — Portfolio personal containerizado con Docker
│
└── voting-app/
    └── Proyecto principal — Aplicación de votación para practicar DevOps
```

## 🚀 Scripts incluidos

### `importar-rama.sh`
Script para clonar, actualizar o copiar una rama específica del proyecto.  
Ejemplo de uso:

```bash
./importar_rama.sh main
```

## 🧪 Proyectos:

### 🎮 Proyecto 1 — DevOps PokéOps

Pequeña API desarrollada en **Flask** que consume datos de **PokéAPI**.

**Objetivo**

- Practicar desarrollo backend simple  
- Consumir APIs externas  
- Preparar aplicaciones para futuros despliegues  

---

### 📚 Proyecto 2 — Book Library

Aplicación web de biblioteca desarrollada en **Flask** y desplegada con:

**Tecnologías utilizadas**

- Gunicorn  
- Nginx  

**Objetivo**

- Entender cómo pasar de desarrollo a un entorno más cercano a producción  
- Aprender a configurar un servidor web como **reverse proxy**

---

### 🌐 Proyecto 3 — Freelancer Deploy

Deploy de una página estática basada en **StartBootstrap** usando:

**Tecnologías utilizadas**

- Nginx  
- Ansible  
- Vagrant  

**Objetivo**

- Automatizar la provisión de infraestructura  
- Practicar despliegues reproducibles  

---

### 🖥️ Proyecto 4 — Portfolio

Portfolio personal containerizado utilizando **Docker**.

**Objetivo**

- Practicar **containerización**  
- Preparar una aplicación web simple para despliegue en contenedores  

---

### 🗳️ Proyecto principal — Voting App

Este proyecto será el **centro del laboratorio DevOps** del repositorio.

A lo largo del tiempo se irán agregando progresivamente diferentes componentes DevOps:

- Docker  
- Docker Compose  
- Automatización con Ansible  
- CI/CD  
- Infraestructura reproducible  
- Monitoreo  
- Mejoras de despliegue  

La idea es **ir evolucionando la aplicación a medida que se incorporan nuevas herramientas y prácticas**.