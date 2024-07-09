import { Router } from 'express';
import { createProductController } from './controller';
import { validateRequest } from '../../middlewares';
import { productValidationSchema } from './validation';

const router = Router();

router.route('/').post(validateRequest(productValidationSchema), createProductController);

export default router;
