import dev from './dev';
import prod from './prod';

let config;

switch (process.env.NODE_ENV) {
  case "production":
    config = prod;
    break;
  default:
    config = dev;
    break;
}

export default config;