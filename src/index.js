require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('../src/infraestructura/mongoose/DbConnection.js');

connectDB();
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('BIENVENIDO A TYPA CREDICORP🚀');
});

//import routes
const routes = [
  require('../src/adapters/http/user/user-routes'),
  require('../src/adapters/http/restaurant/restaurant-routes'),
  require('../src/adapters/http/transaction/transaction-routes'),
];

//register route
routes.forEach((routeModule) => {
  routeModule.forEach((route) => {
    const middlewares = route.middlewares || [];
    switch (route.method) {
      case 'GET':
        app.get(route.url, ...middlewares, route.handler);
        break;
      case 'POST':
        app.post(route.url, ...middlewares, route.handler);
        break;
      case 'PUT':
        app.put(route.url, ...middlewares, route.handler);
        break;
      case 'DELETE':
        app.delete(route.url, ...middlewares, route.handler);
        break;
      default:
        console.log(`Invalid method ${route.method} for route ${route.url}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Typa Server Running http://localhost:${port} 🌐🌐🌐`);
});
