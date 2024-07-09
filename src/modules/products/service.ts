import Product from './model';
import { TProduct } from './validation';

export const createProductService = (data: TProduct) => {
    return Product.create(data);
};
