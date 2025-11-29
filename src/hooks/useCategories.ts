import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { categoriesApi } from '../api/categoriesApi';
import type {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
    CategoryFilters,
    PaginatedResponse,
} from '../types/api';

// Query keys
export const categoryKeys = {
    all: ['categories'] as const,
    lists: () => [...categoryKeys.all, 'list'] as const,
    list: (filters?: CategoryFilters) => [...categoryKeys.lists(), filters] as const,
    paginated: (filters?: CategoryFilters) => [...categoryKeys.all, 'paginated', filters] as const,
    details: () => [...categoryKeys.all, 'detail'] as const,
    detail: (id: string) => [...categoryKeys.details(), id] as const,
    slug: (slug: string) => [...categoryKeys.all, 'slug', slug] as const,
};

// GET /categories - Get all active categories
export const useCategories = (): UseQueryResult<Category[], Error> => {
    return useQuery({
        queryKey: categoryKeys.lists(),
        queryFn: categoriesApi.getAll,
    });
};

// GET /categories/paginated - Get paginated categories with filters
export const useCategoriesPaginated = (
    filters?: CategoryFilters
): UseQueryResult<PaginatedResponse<Category>, Error> => {
    return useQuery({
        queryKey: categoryKeys.paginated(filters),
        queryFn: () => categoriesApi.getPaginated(filters),
    });
};

// GET /categories/:id - Get category by ID
export const useCategory = (id: string): UseQueryResult<Category, Error> => {
    return useQuery({
        queryKey: categoryKeys.detail(id),
        queryFn: () => categoriesApi.getById(id),
        enabled: !!id,
    });
};

// GET /categories/slug/:slug - Get category by slug
export const useCategoryBySlug = (slug: string): UseQueryResult<Category, Error> => {
    return useQuery({
        queryKey: categoryKeys.slug(slug),
        queryFn: () => categoriesApi.getBySlug(slug),
        enabled: !!slug,
    });
};

// POST /categories - Create new category
export const useCreateCategory = (): UseMutationResult<
    Category,
    Error,
    CreateCategoryDto
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesApi.create,
        onSuccess: () => {
            // Invalidate and refetch categories list
            queryClient.invalidateQueries({ queryKey: categoryKeys.all });
        },
    });
};

// PATCH /categories/:id - Update category
export const useUpdateCategory = (): UseMutationResult<
    Category,
    Error,
    { id: string; data: UpdateCategoryDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => categoriesApi.update(id, data),
        onSuccess: (_, variables) => {
            // Invalidate the specific category and the list
            queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: categoryKeys.all });
        },
    });
};

// DELETE /categories/:id - Delete category
export const useDeleteCategory = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesApi.delete,
        onSuccess: (_, id) => {
            // Remove the specific category from cache and invalidate lists
            queryClient.removeQueries({ queryKey: categoryKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: categoryKeys.all });
        },
    });
};
