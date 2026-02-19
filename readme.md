# DevOps90Days

Este repositorio contiene dos componentes principales:

1. **Scripts utilitarios**  
   Scripts destinados a automatizar tareas, como copiar una rama específica del proyecto.

2. **Proyectos: `devops-pokeops`**  
   Carpeta donde se encuentra todo el desarrollo del proyecto (infraestructura, código, pipelines, etc.).  
   Dentro de esta carpeta también se encuentra el `.gitignore` correspondiente a ese proyecto.

---

## 📁 Estructura del repositorio
DevOps90Days/
│
├── copy-branch.sh # Script para copiar/actualizar una rama específica
│
└── devops-pokeops/ # Proyecto 1
├── .gitignore # Ignora archivos específicos de este proyecto
├── backend
├── frontend
└── ...


## 🚀 Scripts incluidos

### `copy-branch.sh`
Script para clonar, actualizar o copiar una rama específica del proyecto.  
Ejemplo de uso:

```bash
./copy-branch.sh main