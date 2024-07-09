import { Router } from 'express';
import routes from '../routes';
import rootRoutes from '../routes/rootRoutes';

const router = Router();

router.use('/', rootRoutes);
router.use('/api/v1', routes);

export default router;
