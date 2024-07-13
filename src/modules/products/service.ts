import httpStatus from 'http-status';
import ApiFeatures from '../../builder/api-feature';
import { QueryString } from '../../interfaces/query';
import AppError from '../../utils/app-error';
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

interface Pagination {
    page: number;
    totalPage: number;
    limit: number;
    next?: number;
    prev?: number;
    totalProducts: number;
}

export const getProductsService = async (query: QueryString) => {
    console.log(query);
    const features = new ApiFeatures<TProduct>(Product.find(), query).apply(['title', 'brand']);
    const productsCount = new ApiFeatures<TProduct>(Product.find(), query)
        .search(['title', 'brand'])
        .filter();

    const totalProducts = await productsCount.query.countDocuments();

    const totalPage = Math.ceil(totalProducts / (Number(query.limit) || 10));
    const pagination: Pagination = {
        totalPage,
        totalProducts,
        limit: Number(query.limit) || 10,

        page: Number(query.page) || 1,
    };

    if ((Number(query.page) || 1) < totalPage) {
        pagination.next = (Number(query.page) || 1) + 1;
    }

    if ((Number(query.page) || 1) > 1) {
        pagination.prev = Number(query.page) - 1;
    }
    const products = await features;
    // console.log(products);
    console.log(pagination);
    return {
        products,
        pagination,
    };
};

export const getSingleProductService = (productId: string) => {
    return Product.findById(productId);
};

export interface OrderItems {
    product: string;
    quantity: number;
}

export const orderService = async (items: OrderItems[]) => {
    for (const item of items) {
        const product = await Product.findById(item.product);

        if (product) {
            if (product.availableQuantity >= item.quantity) {
                product.availableQuantity -= item.quantity;

                await product.save();
            } else {
                throw new AppError(
                    `Insufficient quantity for ${product.title}`,
                    httpStatus.BAD_REQUEST,
                );
            }
        } else {
            throw new AppError(`Product not found: ID ${item.product}`, httpStatus.BAD_REQUEST);
        }
    }

    return {
        items,
    };
};
