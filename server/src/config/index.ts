import 'dotenv/config';
import { IConfig } from './config.interface';

const config: IConfig = {
  apiPrefix: '/',
  tokenKey: process.env.TOKEN_KEY as string,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY as string,
  salt: process.env.SALT as string,
};

export default config;
