import { RequestHandler } from 'express';
import {
    createProductService,
    deleteProductService,
    getProductsService,
    getSingleProductService,
    orderService,
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
export const getProductsController: RequestHandler = async (req, res) => {
    const query = req.query;

    const data = await getProductsService(query);

    res.status(httpStatus.OK).json(new APIResponse(true, 'Products fetch successfully', data));
};
export const getSingleProductController: RequestHandler = async (req, res, next) => {
    const productId = req.params.id;

    const product = await getSingleProductService(productId);

    if (!product) return next(new AppError('No product found', 404));

    res.status(httpStatus.OK).json(new APIResponse(true, 'Product fetch successfully', product));
};

export const orderController: RequestHandler = async (req, res) => {
    const items = req.body.data;
    console.log(items);

    const result = await orderService(items);

    res.status(httpStatus.OK).json(new APIResponse(true, 'Order successful', result));
};
