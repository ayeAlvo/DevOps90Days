# DevOps90Days

Este repositorio contiene dos componentes principales:

1. **Scripts utilitarios**  
   Scripts destinados a automatizar tareas, como copiar una rama específica del proyecto.

2. **Proyectos: `devops-pokeops`**  
   Carpeta donde se encuentra todo el desarrollo del proyecto (infraestructura, código, pipelines, etc.).  
   Dentro de esta carpeta también se encuentra el `.gitignore` correspondiente a ese proyecto.

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
    └── Proyecto 3 — StartBootstrap + Nginx + Ansible + Vagrant
```

## 🚀 Scripts incluidos

### `importar-rama.sh`
Script para clonar, actualizar o copiar una rama específica del proyecto.  
Ejemplo de uso:

```bash
./importar_rama.sh main