import { RequestHandler } from 'express';
import {
    createProductService,
    deleteProductService,
    getProductService,
    updateProductService,
} from './service';
import APIResponse from '../../utils/api-response';
import httpStatus from 'http-status';
import AppError from '../../utils/app-error';

export const createProductController: RequestHandler = async (req, res) => {
    const data = req.body;

    const product = await createProductService(data);

    res.status(httpStatus.CREATED).json(
        new APIResponse(true, 'Product created successfully', product),
    );
};
export const updateProductController: RequestHandler = async (req, res) => {
    const productId = req.params.id;
    const data = req.body;

    const product = await updateProductService(productId, data);

    res.status(httpStatus.OK).json(new APIResponse(true, 'Product update successfully', product));
};
export const deleteProductController: RequestHandler = async (req, res) => {
    const productId = req.params.id;

    await deleteProductService(productId);

    res.status(httpStatus.OK).json(new APIResponse(true, 'Product deleted successfully', null));
};
export const getProductController: RequestHandler = async (req, res, next) => {
    const query = req.query;

    const products = await getProductService(query);

    if (!products.length) return next(new AppError('No product found', 404));

    res.status(httpStatus.OK).json(new APIResponse(true, 'Product fetch successfully', products));
};
