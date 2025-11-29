import httpClient from './httpClient';
import type {
    Purchase,
    CreatePurchaseDto,
    UpdatePurchaseDto,
    PurchaseFilters,
    PaginatedResponse,
} from '../types/api';

const PURCHASES_ENDPOINT = '/purchases';

export const purchasesApi = {
    // POST /purchases - Create purchase (initiate ebook purchase)
    create: async (data: CreatePurchaseDto): Promise<Purchase> => {
        const response = await httpClient.post<Purchase>(PURCHASES_ENDPOINT, data);
        return response.data;
    },

    // GET /purchases - Get all purchases (admin)
    getAll: async (): Promise<Purchase[]> => {
        const response = await httpClient.get<Purchase[]>(PURCHASES_ENDPOINT);
        return response.data;
    },

    // GET /purchases/my-purchases - Get user's purchases
    getMyPurchases: async (): Promise<Purchase[]> => {
        const response = await httpClient.get<Purchase[]>(`${PURCHASES_ENDPOINT}/my-purchases`);
        return response.data;
    },

    // GET /purchases/paginated - Get paginated purchases with filters
    getPaginated: async (filters?: PurchaseFilters): Promise<PaginatedResponse<Purchase>> => {
        const response = await httpClient.get<PaginatedResponse<Purchase>>(
            `${PURCHASES_ENDPOINT}/paginated`,
            { params: filters }
        );
        return response.data;
    },

    // GET /purchases/user/:userId - Get purchases by user ID
    getByUserId: async (userId: string): Promise<Purchase[]> => {
        const response = await httpClient.get<Purchase[]>(`${PURCHASES_ENDPOINT}/user/${userId}`);
        return response.data;
    },

    // GET /purchases/check/:ebookId - Check if user purchased ebook
    checkPurchase: async (ebookId: string): Promise<{ purchased: boolean; purchase?: Purchase }> => {
        const response = await httpClient.get<{ purchased: boolean; purchase?: Purchase }>(
            `${PURCHASES_ENDPOINT}/check/${ebookId}`
        );
        return response.data;
    },

    // GET /purchases/:id - Get purchase by ID
    getById: async (id: string): Promise<Purchase> => {
        const response = await httpClient.get<Purchase>(`${PURCHASES_ENDPOINT}/${id}`);
        return response.data;
    },

    // PATCH /purchases/:id - Update purchase
    update: async (id: string, data: UpdatePurchaseDto): Promise<Purchase> => {
        const response = await httpClient.patch<Purchase>(`${PURCHASES_ENDPOINT}/${id}`, data);
        return response.data;
    },

    // DELETE /purchases/:id - Delete purchase
    delete: async (id: string): Promise<void> => {
        await httpClient.delete(`${PURCHASES_ENDPOINT}/${id}`);
    },
};
