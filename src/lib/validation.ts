import { z } from 'zod';

// User Registration Schema
export const UserRegistrationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export type UserRegistrationForm = z.infer<typeof UserRegistrationSchema>;

// User Login Schema
export const UserLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type UserLoginForm = z.infer<typeof UserLoginSchema>;

// Product Upsert (Create/Update) Schema
export const ProductUpsertSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    // Coerce input to number, useful for HTML inputs
    price: z.coerce.number().min(0, "Price must be a positive number"),
    quantity: z.coerce.number().int().min(0, "Quantity must be a positive integer"),
    category_id: z.coerce.number().int().positive("Please select a category"),
    image: z.string().url("Invalid image URL").optional().or(z.literal('')),
});

export type ProductUpsertForm = z.infer<typeof ProductUpsertSchema>;
