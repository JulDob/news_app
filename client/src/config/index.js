import localConfig from './config.local';
import prodConfig from './config.production';

const env = process.env.NODE_ENV || 'development';

export default env === 'development' ? localConfig : prodConfig;
