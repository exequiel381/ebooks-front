import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { ebooksApi } from '../api/ebooksApi';
import type {
    Ebook,
    CreateEbookDto,
    UpdateEbookDto,
    EbookFilters,
    PaginatedResponse,
} from '../types/api';

// Query keys
export const ebookKeys = {
    all: ['ebooks'] as const,
    lists: () => [...ebookKeys.all, 'list'] as const,
    list: (filters?: EbookFilters) => [...ebookKeys.lists(), filters] as const,
    paginated: (filters?: EbookFilters) => [...ebookKeys.all, 'paginated', filters] as const,
    featured: () => [...ebookKeys.all, 'featured'] as const,
    details: () => [...ebookKeys.all, 'detail'] as const,
    detail: (id: string) => [...ebookKeys.details(), id] as const,
    category: (categoryId: string) => [...ebookKeys.all, 'category', categoryId] as const,
    isbn: (isbn: string) => [...ebookKeys.all, 'isbn', isbn] as const,
};

// GET /ebooks - Get all active ebooks
export const useEbooks = (): UseQueryResult<Ebook[], Error> => {
    return useQuery({
        queryKey: ebookKeys.lists(),
        queryFn: ebooksApi.getAll,
    });
};

// GET /ebooks/featured - Get featured ebooks
export const useFeaturedEbooks = (): UseQueryResult<Ebook[], Error> => {
    return useQuery({
        queryKey: ebookKeys.featured(),
        queryFn: ebooksApi.getFeatured,
    });
};

// GET /ebooks/paginated - Get paginated ebooks with filters
export const useEbooksPaginated = (
    filters?: EbookFilters
): UseQueryResult<PaginatedResponse<Ebook>, Error> => {
    return useQuery({
        queryKey: ebookKeys.paginated(filters),
        queryFn: () => ebooksApi.getPaginated(filters),
    });
};

// GET /ebooks/category/:categoryId - Get ebooks by category
export const useEbooksByCategory = (categoryId: string): UseQueryResult<Ebook[], Error> => {
    return useQuery({
        queryKey: ebookKeys.category(categoryId),
        queryFn: () => ebooksApi.getByCategory(categoryId),
        enabled: !!categoryId,
    });
};

// GET /ebooks/:id - Get ebook by ID
export const useEbook = (id: string): UseQueryResult<Ebook, Error> => {
    return useQuery({
        queryKey: ebookKeys.detail(id),
        queryFn: () => ebooksApi.getById(id),
        enabled: !!id,
    });
};

// GET /ebooks/isbn/:isbn - Get ebook by ISBN
export const useEbookByIsbn = (isbn: string): UseQueryResult<Ebook, Error> => {
    return useQuery({
        queryKey: ebookKeys.isbn(isbn),
        queryFn: () => ebooksApi.getByIsbn(isbn),
        enabled: !!isbn,
    });
};

// POST /ebooks - Create new ebook
export const useCreateEbook = (): UseMutationResult<
    Ebook,
    Error,
    CreateEbookDto
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ebooksApi.create,
        onSuccess: () => {
            // Invalidate and refetch ebooks list
            queryClient.invalidateQueries({ queryKey: ebookKeys.all });
        },
    });
};

// PATCH /ebooks/:id - Update ebook
export const useUpdateEbook = (): UseMutationResult<
    Ebook,
    Error,
    { id: string; data: UpdateEbookDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => ebooksApi.update(id, data),
        onSuccess: (updatedEbook, variables) => {
            // Invalidate the specific ebook and related queries
            queryClient.invalidateQueries({ queryKey: ebookKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: ebookKeys.lists() });
            queryClient.invalidateQueries({ queryKey: ebookKeys.all });

            // If category changed, invalidate category-specific queries
            if (updatedEbook.categoryId) {
                queryClient.invalidateQueries({ queryKey: ebookKeys.category(updatedEbook.categoryId) });
            }
        },
    });
};

// DELETE /ebooks/:id - Delete ebook
export const useDeleteEbook = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ebooksApi.delete,
        onSuccess: (_, id) => {
            // Remove the specific ebook from cache and invalidate lists
            queryClient.removeQueries({ queryKey: ebookKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: ebookKeys.all });
        },
    });
};
