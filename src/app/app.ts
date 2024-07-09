import express from 'express';
import 'express-async-errors';

import middleware from './middleware';
import routes from './routes';
import globalErrorHandler from './errors';
import routeNotFound from '../errors/route-not-found';

const app = express();

app.use(middleware);
app.use(routes);

app.use(routeNotFound);

app.use(globalErrorHandler);

export default app;
