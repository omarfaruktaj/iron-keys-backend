import { Router } from 'express';
import {
    createProductController,
    deleteProductController,
    getProductsController,
    getSingleProductController,
    orderController,
    updateProductController,
} from './controller';
import { validateRequest } from '../../middlewares';
import { productValidationSchema, updateProductValidationSchema } from './validation';

const router = Router();
router.put('/order', orderController);

router
    .route('/')
    .post(validateRequest(productValidationSchema), createProductController)
    .get(getProductsController);

router
    .route('/:id')
    .get(getSingleProductController)
    .put(validateRequest(updateProductValidationSchema), updateProductController)
    .delete(deleteProductController);
export default router;
