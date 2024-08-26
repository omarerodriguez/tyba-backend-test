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
  
  
  # Credenciales de usuario listo:
  ```json
    {
        "email":"omarmr7214@gmail.com",
        "password":"3002691428"
    }
  ```
## Endpoints
   - `POST /signup`
  
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

- POST /logout

  Cierra sesion del usuario y devuelve un mensaje de exito.

```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
```

Response:
```json
    {
    "message": "User logged out successfully"
    }
```

  - GET /restaurants

  Busca restaurantes. Puedes proporcionar parámetros como city.

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

 - GET /restaurants/location
   
    Busca restaurantes. Puedes proporcionar parámetros como location.

   Request:

```bash
    GET /restaurants/location?type=restaurant&location=10.96854,-74.78132
```

Response:

```json
[
        {
            "id": "ChIJrcg991At9I4RvLtiXIci-e4",
            "name": "Restaurante Parrillada La Casa de Jhon"
        },
        {
            "id": "ChIJsbyeI1st9I4Rt0RirUHLs3Q",
            "name": "MIA'S PIZZA BAQ"
        }
]
```

- GET /restaurants/id
  
    Busca restaurantes. Puedes proporcionar parámetros como el id del restaurante.

   Request:

```bash
    GET /restaurants/id?restaurantId=ChIJhemZti0t9I4RnM0NYteYDbs
```

Response:

```json
"data": {
        "id": "ChIJhemZti0t9I4RnM0NYteYDbs",
        "name": "Storia D'Amore Barranquilla",
        "address": "Cra. 52 #80-43, Nte. Centro Historico, Barranquilla, Atlántico, Colombia",
        "phone": "300 9134441",
        "rating": 4.7
    }
```

- GET /restaurants/transactions

Para consultar la lista de las transacciones realizadas.

Request:

```bash
    GET /restaurants/transactions
```

Response:

```json
[
        {
            "_id": "66cc99ef9a92d5e9a8efb921",
            "amount": 200000,
            "status": "failed",
            "userId": "66cbdbd926069d45753f3193",
            "restaurantId": "ChIJX9J-kAst9I4RjAoK6ndqx70",
            "transactionId": "97d437fd-62b5-4a04-b8e3-1ad478d61256",
            "createdAt": "2024-08-26T15:06:23.346Z",
            "updatedAt": "2024-08-26T15:06:23.346Z",
            "__v": 0
        },
        {},
]
```

- POST /restaurants/transactions
  
  Para crear transacciones.

Request:

```bash
    POST /restaurants/transactions

    Body:
    {
        "amount":95000,
        "userId":"66cbdbd926069d45753f3193",
        "restaurantId":"ChIJKevArcct9I4R_zVjZ0yfKyA"
    }
```
Response:

```json
 "data": {
        "amount": 98000,
        "status": "failed",
        "userId": "66cbdbd926069d45753f3193",
        "restaurantId": "ChIJe61h-gkt9I4RCLElW_wMj68",
        "_id": "66cd05d4b9dc5a6d185c4718",
        "transactionId": "9da92b9c-396d-4b30-9186-b04fdad62a59",
        "createdAt": "2024-08-26T22:46:44.562Z",
        "updatedAt": "2024-08-26T22:46:44.562Z",
        "__v": 0
    }
```

  ## Ejemplo de Solicitudes

  Puedes usar [Postman](https://www.postman.com/) o curl para probar los endpoints.

  Ejemplo con curl:

  - Registrar un usuario:

  ```bash
   curl -X POST http://localhost:3001/signup \
   -H "Content-Type: application/json" \
   -d '{"username": "omar", "email": "omarmr7214@gmail.com", "password": "3002691428", "phone": "3002691428", "city": "barranquilla"}'
  ```

  - Buscar restaurantes:

   curl http://localhost:3001/restaurants?city=barranquilla

   ### **NOTA**
   Estas credenciales son personales con fines para el buen desarrollo y fluidez de la prueba 


