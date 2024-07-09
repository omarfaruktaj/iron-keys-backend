import { cleanEnv, port, str, url } from 'envalid';
import defaults from './defaults';

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'], default: defaults.env }),
    port: port({ default: defaults.port }),
    DATABASE_URI: url(),
});

export default env;
