import { RequestHandler } from 'express';
import { createProductService, updateProductService } from './service';
import APIResponse from '../../utils/api-response';
import httpStatus from 'http-status';

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
