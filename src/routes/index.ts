import { Router } from 'express';

import productRoutes from '../modules/products/routes';

const router = Router();

router.use('/products', productRoutes);

export default router;
