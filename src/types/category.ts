import type { PaginationParams } from './common';

// Category types
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryDto {
    name: string;
    description?: string;
    slug?: string;
}

export interface UpdateCategoryDto {
    name?: string;
    description?: string;
    slug?: string;
    isActive?: boolean;
}

export interface CategoryFilters extends PaginationParams {
    search?: string;
    isActive?: boolean;
}
