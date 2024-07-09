import { RequestHandler } from 'express';
import { createProductService } from './service';
import APIResponse from '../../utils/api-response';

export const createProductController: RequestHandler = async (req, res) => {
    const data = req.body;
    console.log(data);

    const product = await createProductService(data);

    res.status(201).json(new APIResponse(true, 'Product created successfully', product));
};
