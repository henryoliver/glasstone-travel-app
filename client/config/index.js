import development from './development.config';
import production from './production.config';

export default ({
    development,
    production
})[process.env.NODE_ENV];
