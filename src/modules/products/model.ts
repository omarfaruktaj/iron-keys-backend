import { model, Schema } from 'mongoose';
import { TProduct } from './validation';

const productSchema = new Schema<TProduct>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        brand: {
            type: String,
            required: [true, 'Brand is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            trim: true,
        },
        availableQuantity: {
            type: Number,
            default: 0,
            min: [0, "Available Quantity can't be less than 0"],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, "Price can't be less than 0"],
        },
        rating: {
            type: Number,
            min: [0, "Rating can't be less than 0"],
            max: [5, "Rating can't be more than 5"],
        },
    },
    { timestamps: true },
);

const Product = model<TProduct>('Product', productSchema);

export default Product;
