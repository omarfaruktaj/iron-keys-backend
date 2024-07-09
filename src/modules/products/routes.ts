import { Router } from 'express';
import { createProductController, updateProductController } from './controller';
import { validateRequest } from '../../middlewares';
import { productValidationSchema, updateProductValidationSchema } from './validation';

const router = Router();

router.route('/').post(validateRequest(productValidationSchema), createProductController);
router.route('/:id').put(validateRequest(updateProductValidationSchema), updateProductController);

export default router;
