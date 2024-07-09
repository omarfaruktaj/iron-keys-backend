import { z } from 'zod';

export const productValidationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    image: z.string().min(1, { message: 'Image is required' }),
    availableQuantity: z
        .number()
        .min(0, { message: "Available Quantity can't be less than 0" })
        .default(0),
    price: z.number().min(0, { message: "Price can't be less than 0" }),
    rating: z
        .number()
        .min(0, { message: "Rating can't be less than 0" })
        .max(5, { message: "Rating can't be more than 5" })
        .optional(),
});

export const updateProductValidationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    description: z.string().min(1, { message: 'Description is required' }).optional(),
    brand: z.string().min(1, { message: 'Brand is required' }).optional(),
    image: z.string().min(1, { message: 'Image is required' }).optional(),
    availableQuantity: z
        .number()
        .min(0, { message: "Available Quantity can't be less than 0" })
        .default(0)
        .optional(),
    price: z.number().min(0, { message: "Price can't be less than 0" }).optional(),
    rating: z
        .number()
        .min(0, { message: "Rating can't be less than 0" })
        .max(5, { message: "Rating can't be more than 5" })
        .optional(),
});

export type TProduct = z.infer<typeof productValidationSchema>;
export type TUpdateProduct = z.infer<typeof productValidationSchema>;
