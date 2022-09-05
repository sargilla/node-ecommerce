# E-Commerce

Proyecto de un E-Commerce en Nodejs, con ejs, base de datos Mysql con Sequelize.

Este proyecto cuenta con un ABM de productos, registro y login de usuarios, middlewares para rutas de usuario y es un boilerplate para empezar a desarrollar un carrito de compras

## Instalación

Clonar el repo

```
git clone git@github.com:sargilla/node-ecommerce.git
```

Instalar paquetes

```
npm install
```

Crear .env para las variables de entorno

```
cp .env.example .env
```

Crear la base de datos y configurar el .env con los datos de su conexión

```
DB_USER=
DB_PASS=
DB_NAME=
```

Ejecutar la migración para crear las tablas en la DB_NAME

```
sequelize db:migrate
```

Inicializar el proyecto

```
npm start
```
