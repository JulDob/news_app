import App from './app';
import 'dotenv/config';

const bootstrap = () => {
  const app = new App(3001);
  app.init();
};

bootstrap();
