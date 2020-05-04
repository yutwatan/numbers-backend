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
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    // run app
    app.listen(3000);

    console.log('Express application is up and running on port 3000');
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
