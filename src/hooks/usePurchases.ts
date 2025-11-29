import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { purchasesApi } from '../api/purchasesApi';
import type {
    Purchase,
    CreatePurchaseDto,
    UpdatePurchaseDto,
    PurchaseFilters,
    PaginatedResponse,
} from '../types/api';

// Query keys
export const purchaseKeys = {
    all: ['purchases'] as const,
    lists: () => [...purchaseKeys.all, 'list'] as const,
    list: (filters?: PurchaseFilters) => [...purchaseKeys.lists(), filters] as const,
    paginated: (filters?: PurchaseFilters) => [...purchaseKeys.all, 'paginated', filters] as const,
    myPurchases: () => [...purchaseKeys.all, 'my-purchases'] as const,
    details: () => [...purchaseKeys.all, 'detail'] as const,
    detail: (id: string) => [...purchaseKeys.details(), id] as const,
    byUser: (userId: string) => [...purchaseKeys.all, 'user', userId] as const,
    check: (ebookId: string) => [...purchaseKeys.all, 'check', ebookId] as const,
};

// GET /purchases - Get all purchases (admin)
export const usePurchases = (): UseQueryResult<Purchase[], Error> => {
    return useQuery({
        queryKey: purchaseKeys.lists(),
        queryFn: purchasesApi.getAll,
    });
};

// GET /purchases/my-purchases - Get user's purchases
export const useMyPurchases = (): UseQueryResult<Purchase[], Error> => {
    return useQuery({
        queryKey: purchaseKeys.myPurchases(),
        queryFn: purchasesApi.getMyPurchases,
    });
};

// GET /purchases/paginated - Get paginated purchases with filters
export const usePurchasesPaginated = (
    filters?: PurchaseFilters
): UseQueryResult<PaginatedResponse<Purchase>, Error> => {
    return useQuery({
        queryKey: purchaseKeys.paginated(filters),
        queryFn: () => purchasesApi.getPaginated(filters),
    });
};

// GET /purchases/user/:userId - Get purchases by user ID
export const usePurchasesByUser = (userId: string): UseQueryResult<Purchase[], Error> => {
    return useQuery({
        queryKey: purchaseKeys.byUser(userId),
        queryFn: () => purchasesApi.getByUserId(userId),
        enabled: !!userId,
    });
};

// GET /purchases/check/:ebookId - Check if user purchased ebook
export const useCheckPurchase = (ebookId: string): UseQueryResult<
    { purchased: boolean; purchase?: Purchase },
    Error
> => {
    return useQuery({
        queryKey: purchaseKeys.check(ebookId),
        queryFn: () => purchasesApi.checkPurchase(ebookId),
        enabled: !!ebookId,
    });
};

// GET /purchases/:id - Get purchase by ID
export const usePurchase = (id: string): UseQueryResult<Purchase, Error> => {
    return useQuery({
        queryKey: purchaseKeys.detail(id),
        queryFn: () => purchasesApi.getById(id),
        enabled: !!id,
    });
};

// POST /purchases - Create purchase (initiate ebook purchase)
export const useCreatePurchase = (): UseMutationResult<
    Purchase,
    Error,
    CreatePurchaseDto
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: purchasesApi.create,
        onSuccess: () => {
            // Invalidate and refetch purchases
            queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
        },
    });
};

// PATCH /purchases/:id - Update purchase
export const useUpdatePurchase = (): UseMutationResult<
    Purchase,
    Error,
    { id: string; data: UpdatePurchaseDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => purchasesApi.update(id, data),
        onSuccess: (updatedPurchase, variables) => {
            // Invalidate the specific purchase and lists
            queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.lists() });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });

            // Invalidate check query for the ebook
            if (updatedPurchase.ebookId) {
                queryClient.invalidateQueries({ queryKey: purchaseKeys.check(updatedPurchase.ebookId) });
            }
        },
    });
};

// DELETE /purchases/:id - Delete purchase
export const useDeletePurchase = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: purchasesApi.delete,
        onSuccess: (_, id) => {
            // Remove the specific purchase from cache and invalidate lists
            queryClient.removeQueries({ queryKey: purchaseKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
        },
    });
};
