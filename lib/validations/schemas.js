import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price must not exceed $999,999.99"),

  category: z
    .string()
    .min(1, "Category is required")
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must not exceed 50 characters"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(999999, "Stock must not exceed 999,999"),

  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters")
    .max(20, "SKU must not exceed 20 characters")
    .regex(
      /^[A-Z0-9-_]+$/,
      "SKU must contain only uppercase letters, numbers, hyphens, and underscores"
    ),
});

export const searchSchema = z.object({
  query: z.string().max(100, "Search query must not exceed 100 characters"),
  category: z.string().optional(),
  sortBy: z.enum(["name", "price", "category", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});
