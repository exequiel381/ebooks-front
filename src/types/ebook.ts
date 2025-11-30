import type { PaginationParams } from './common';
import type { Category } from './category';

// Ebook types
export interface Ebook {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description?: string;
    price: number;
    coverImage?: string;
    fileUrl?: string;
    categoryId: string;
    category?: Category;
    isFeatured: boolean;
    isActive: boolean;
    publishedDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEbookDto {
    title: string;
    author: string;
    isbn: string;
    description?: string;
    price: number;
    coverImage?: string;
    fileUrl?: string;
    categoryId: string;
    isFeatured?: boolean;
    publishedDate?: string;
}

export interface UpdateEbookDto {
    title?: string;
    author?: string;
    isbn?: string;
    description?: string;
    price?: number;
    coverImage?: string;
    fileUrl?: string;
    categoryId?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    publishedDate?: string;
}

export interface EbookFilters extends PaginationParams {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    isActive?: boolean;
}
