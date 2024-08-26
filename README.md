# Proyecto API de Gestión de Usuarios y Busqueda de Restaurantes
Este proyecto es una API de gestión de usuarios y búsqueda de restaurantes utilizando Google Places API.

### Contenido
- [Instalación](#instalación)
- [Comandos](#comandos)
- [Uso de la API](#uso-de-la-api)
- [Endpoints](#endpoints)
- [Ejemplo de Solicitudes](#ejemplo-de-solicitudes)


## Instalación

1. **Clona el repositorio:**

    ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
    ```
2. **Instala dependencias:**

   ```bash
   npm install
    ```
  ## Comandos
  - Poblar la base de datos:
    Para agregar datos de prueba a la base de datos, usa:

    ```bash
    npm run seed
    ```

  - Dockerizar la API:
    Para que el proyecto corra desde docker con docker-compose, usa:

    ```bash
    docker-compose build
    docker-compose up
    ```
    
    **Si por el contrario no quiere o no tiene docker puede pasar a iniciar el servidor localmente(siguiente paso)**
    
  - Iniciar el servidor:
  Para iniciar el servidor, usa:

    ```bash
    npm run start
    ```

  ## Uso de la API
  Una vez que el servidor esté en ejecución, puedes consultar la API utilizando herramientas como [Postman](https://www.postman.com/) o curl.
  
  ## Endpoints
  
   - `POST /register`
  
  Registra un nuevo usuario.
  
  Request:
```json
  {
    "username": "omar",
    "email": "omarmr7214@gmail.com",
    "password": "3002691428",
    "phone": "3002691428",
    "city": "barranquilla"
  }
```

Response:
```json
    {
      "user": {
       "username": "omar",
        "email": "omarmr7214@gmail.com",
        "phone": "3002691428",
        "city": "barranquilla"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
```
- POST /login

  Autentica a un usuario y devuelve un token.

  Request:
```json
    {
      "email": "omarmr7214@gmail.com",
      "password": "3002691428"
    }
```
  Response:

```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
```
  - GET /restaurants

  Busca restaurantes. Puedes proporcionar parámetros como city o location.

  Request:

```bash
    GET /restaurants?city=barranquilla
```
  Response:

```json
    {
      "results": [
      {
          "name": "Restaurante Ejemplo",
          "address": "Calle Ejemplo 123",
          "rating": 4.5
        }
      ]
    }
```
  ## Ejemplo de Solicitudes

  Puedes usar [Postman](https://www.postman.com/) o curl para probar los endpoints.

  Ejemplo con curl:

  - Registrar un usuario:

  ```bash
   curl -X POST http://localhost:3001/register \
   -H "Content-Type: application/json" \
   -d '{"username": "omar", "email": "omarmr7214@gmail.com", "password": "3002691428", "phone": "3002691428", "city": "barranquilla"}'
  ```

  - Buscar restaurantes:


   curl http://localhost:3001/restaurants?city=barranquilla

   ### **NOTA**
   Estas credenciales son personales con fines para el buen desarrollo y fluidez de la prueba 


