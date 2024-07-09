import { model, Schema } from 'mongoose';
import { IProduct } from './interfaces';

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
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
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
