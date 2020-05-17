import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Routes } from './routes';

createConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    Routes.forEach((route) => {
      app[route.method](
        route.path,
        (req: Request, res: Response, next: Function) => {
          res.set('Access-Control-Allow-Origin', '*');
          route
            .action(req, res)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    // For CORS
    app.use((req: Request, res: Response, next: Function) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
      );

      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    // DO NOT DO app.listen() unless we're testing this directly
    if (require.main === module) {
      //app.listen(3000);
      //console.log('Express application is up and running on port 3000');
    }

    // Serves on 80 and 443
    // Get's SSL certificates magically!
    require("greenlock-express")
      .init({
        packageRoot: __dirname + '/../',
        configDir: "./greenlock.d",

        maintainerEmail: "yutwatan@yahoo.co.jp",

        cluster: false
      })
      .serve(app);

  })
  .catch((error) => console.log('TypeORM connection error: ', error));
