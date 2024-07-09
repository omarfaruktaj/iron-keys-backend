import Product from './model';
import { TProduct, TUpdateProduct } from './validation';

export const createProductService = (data: TProduct) => {
    return Product.create(data);
};
export const updateProductService = (productId: string, data: TUpdateProduct) => {
    return Product.findByIdAndUpdate(productId, data, {
        new: true,
        runValidators: true,
    });
};
export const deleteProductService = (productId: string) => {
    return Product.findByIdAndDelete(productId);
};
