// duruma göre değişiklik gösteren ayarlar.
let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  let config = require('./config.json');
  let envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
} else {
  let config = require('./config.json');
  process.env.SESSION_SECRET = config["production"]["SESSION_SECRET"];
}

