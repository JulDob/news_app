import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import userRoutes from './users/user.routes';
import articleRoutes from './article/article.routes';
import Exception from './common/Exception';
import config from './config';
import swaggerDocument from '../swagger.json';
import bodyParser from 'body-parser';
import path from 'path';
import { connetDB } from './common/db-client.connect';

export default class App {
  app: Express;

  port: number;

  server: unknown;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  useRoutes() {
    const router = express.Router();

    router.use('/users', userRoutes);
    router.use('/news', articleRoutes);
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use(config.apiPrefix, router);
  }

  async init() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors());

    connetDB();

    this.app.use(`/static`, express.static(path.join(__dirname, '../public')));
    this.useRoutes();

    function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
      if (err instanceof Exception) {
        res.status(err.code);
        return res.send(err);
      }

      res.status(500);
      return res.send({
        errorCode: 500,
        errorMessage: err.message,
      });
    }

    this.app.use(errorHandler);
    this.app.use('*', (req, res, next) => {
      return res.status(404).json({ message: 'Page not found' });
    });
    this.server = this.app.listen(this.port);
    console.log(`Server is working on port ${this.port}`);
  }
}
