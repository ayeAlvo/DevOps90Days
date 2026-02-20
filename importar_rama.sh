#!/bin/bash

REPO_ORIGEN="https://github.com/roxsross/devops-static-web.git"
RAMA="$1"
FLAG="$2"
MI_REPO="$HOME/Documents/myRepos/DevOps90Days"
DESTINO="$MI_REPO/$RAMA"
TEMP_DIR="/tmp/devops-temp-$$"

if [ -z "$RAMA" ]; then
    echo "❌ Error: Hay que pasar la rama como argumento."
    echo "Ejemplo:"
    echo "  ./importar-rama.sh devops-pokeops"
    echo "  ./importar-rama.sh devops-pokeops --commit"
    exit 1
fi

if [ ! -d "$MI_REPO" ]; then
    echo "❌ Error: El repositorio destino no existe: $MI_REPO"
    exit 1
fi

if [ -d "$DESTINO" ]; then
    echo "⚠️ La carpeta destino ya existe: $DESTINO"
    echo "No se copia nada."
    exit 1
fi

echo "📥 Clonando repo en carpeta temporal..."
git clone --branch "$RAMA" --single-branch "$REPO_ORIGEN" "$TEMP_DIR" >/dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Error al clonar la rama '$RAMA'. ¿Existe?"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "📂 Copiando contenido a $DESTINO ..."
mkdir -p "$DESTINO"
cp -R "$TEMP_DIR"/. "$DESTINO"

echo "🧹 Borrando carpeta temporal..."
rm -rf "$TEMP_DIR"

echo "✅ Listo! Se importó la rama '$RAMA' en: $DESTINO"

if [ "$FLAG" == "--commit" ]; then
    echo "🔄 Realizando commit..."

    cd "$MI_REPO" || exit 1

    git add "$RAMA"\
    git commit -m "Importo rama $RAMA del repo devops-static-web" || echo "ℹ️ No había cambios para commitear."

    echo "📤 Falta hacer push..."
else
    echo "📌 Subir los cambios manualmente."
fi