import { Router } from 'express';
import {
    createProductController,
    deleteProductController,
    getProductController,
    updateProductController,
} from './controller';
import { validateRequest } from '../../middlewares';
import { productValidationSchema, updateProductValidationSchema } from './validation';

const router = Router();

router
    .route('/')
    .post(validateRequest(productValidationSchema), createProductController)
    .get(getProductController);

router
    .route('/:id')
    .put(validateRequest(updateProductValidationSchema), updateProductController)
    .delete(deleteProductController);

export default router;
