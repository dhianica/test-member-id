import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon'
import path from 'path';

import router from './app/app.routing';

import Middleware from 'rebell-core/dist/src/middleware'

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;
  // Run configuration methods on the Express instance.
  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }
  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(favicon(path.resolve(__dirname, '../favicon.ico')));
    this.express.use(Middleware.loggerMiddleware)
  }
  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    // sample route in App
    this.express.get('/', (req: express.Request, res: express.Response, next: {}): void => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use(Middleware.responseMiddleware)
    this.express.use(router);
    this.express.use(Middleware.errorMiddleware)
  }
}

export default new App().express;
