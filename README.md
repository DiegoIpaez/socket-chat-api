# Socket Chat

Una aplicación de chat en tiempo real construida con Node.js, Express y Socket.io.

## Pre-requisitos 

Tener instalados los programas:

[NodeJs](https://nodejs.org/en/)\@lastest\
[pnpm](https://pnpm.io/es/installation)\@lastest

## Configuración
Antes de iniciar la aplicación, asegúrate de configurar las siguientes variables de entorno en tu archivo .env:

- `NODE_ENV`: entorno de ejecución, puede ser development, production, o test.
- `PORT`: puerto en el que se ejecutará la aplicación.
- `DB_MONGO`: URL de la base de datos MongoDB para entornos de desarrollo y producción.
- `TEST_DB_MONGO`: URL de la base de datos MongoDB para entornos de prueba.
- `JWT_SECRET_KEY`: clave secreta utilizada para firmar tokens de autenticación.

## Instalación

1. Clona el repositorio
2. Instala las dependencias: `pnpm install`
3. Configura las variables de entorno en un archivo `.env` siguiendo el formato del archivo `.env.example`
4. Inicia la aplicación: `pnpm start`

## Scripts

- `build`: Compila el código TypeScript y lo coloca en la carpeta `dist`.
- `dev`: Inicia la aplicación en modo de desarrollo usando `nodemon`.
- `lint`: Ejecuta el linter `eslint` en los archivos TypeScript y corrige automáticamente los errores si es posible.
- `start`: Compila el código TypeScript y lo ejecuta en modo de producción.
- `test`: Ejecuta los tests usando `jest`.
- `test:cov`: Ejecuta los tests y muestra un reporte de cobertura.

## Tecnologías utilizadas

- Node.js
- Express
- Socket.io
- MongoDB
