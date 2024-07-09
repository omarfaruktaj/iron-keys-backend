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

export type TProduct = z.infer<typeof productValidationSchema>;
