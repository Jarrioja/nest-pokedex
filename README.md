<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. clonar el repositorio
2. instalar dependencias con 
```
pnpm install
```
3. Instalar NestJS CLI
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar archivo ```.env.template``` y renombrarlo a ```.env```
6. Llenar las variables de entorno
7. Ejecutar la app
```
pnpm run start:dev
```
8. reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```


## Stack usado
* NestJS
* MongoDB

## Production Build

1. Crear el archivo ```.env.prod``` con las variables de entorno
2. crear la nueva imagen
```
docker compose -f docker-compose.prod.yml --env-file .env.prod --build