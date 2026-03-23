Generá una aplicación full-stack mínima con la siguiente estructura:

mi-app/
├── app/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── src/
│       ├── server.js
│       └── routes.js
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
├── docker-compose.staging.yml
├── docker-compose.prod.yml
└── .env.example

Requisitos:

1. Backend:
   - Node.js + Express.
   - Endpoint GET /health que responda { status: "ok" }.
   - Endpoint GET /db que pruebe conexión a PostgreSQL.
   - Endpoint GET /cache que pruebe conexión a Redis.

2. Dockerfile:
   - Imagen base node:18-alpine.
   - Instalar dependencias, copiar código y exponer puerto 3000.

3. docker-compose.yml (desarrollo):
   - Servicio "app" que use el Dockerfile.
   - Servicio "postgres" con DB, user y password por defecto.
   - Servicio "redis".
   - Servicio "nginx" como reverse proxy.
   - Volúmenes para postgres y redis.

4. docker-compose.staging.yml y .prod.yml:
   - Igual que el base pero sin volúmenes locales y con NODE_ENV correspondiente.

5. nginx.conf:
   - Reverse proxy desde el puerto 80 → app:3000.

6. .env.example:
   - Incluir NODE_ENV, DB_HOST, DB_USER, DB_PASS, REDIS_HOST, PORT.

Creá el código completo para cada archivo.