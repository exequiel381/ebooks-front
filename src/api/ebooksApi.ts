import httpClient from './httpClient';
import type {
    Ebook,
    CreateEbookDto,
    UpdateEbookDto,
    EbookFilters,
    PaginatedResponse,
} from '../types/api';

const EBOOKS_ENDPOINT = '/ebooks';

export const ebooksApi = {
    // GET /ebooks - Get all active ebooks
    getAll: async (): Promise<Ebook[]> => {
        const response = await httpClient.get<Ebook[]>(EBOOKS_ENDPOINT);
        return response.data;
    },

    // POST /ebooks - Create new ebook
    create: async (data: CreateEbookDto): Promise<Ebook> => {
        const response = await httpClient.post<Ebook>(EBOOKS_ENDPOINT, data);
        return response.data;
    },

    // GET /ebooks/featured - Get featured ebooks
    getFeatured: async (): Promise<Ebook[]> => {
        const response = await httpClient.get<Ebook[]>(`${EBOOKS_ENDPOINT}/featured`);
        return response.data;
    },

    // GET /ebooks/paginated - Get paginated ebooks with filters
    getPaginated: async (filters?: EbookFilters): Promise<PaginatedResponse<Ebook>> => {
        const response = await httpClient.get<PaginatedResponse<Ebook>>(
            `${EBOOKS_ENDPOINT}/paginated`,
            { params: filters }
        );
        return response.data;
    },

    // GET /ebooks/category/:categoryId - Get ebooks by category
    getByCategory: async (categoryId: string): Promise<Ebook[]> => {
        const response = await httpClient.get<Ebook[]>(`${EBOOKS_ENDPOINT}/category/${categoryId}`);
        return response.data;
    },

    // GET /ebooks/isbn/:isbn - Get ebook by ISBN
    getByIsbn: async (isbn: string): Promise<Ebook> => {
        const response = await httpClient.get<Ebook>(`${EBOOKS_ENDPOINT}/isbn/${isbn}`);
        return response.data;
    },

    // GET /ebooks/:id - Get ebook by ID
    getById: async (id: string): Promise<Ebook> => {
        const response = await httpClient.get<Ebook>(`${EBOOKS_ENDPOINT}/${id}`);
        return response.data;
    },

    // PATCH /ebooks/:id - Update ebook
    update: async (id: string, data: UpdateEbookDto): Promise<Ebook> => {
        const response = await httpClient.patch<Ebook>(`${EBOOKS_ENDPOINT}/${id}`, data);
        return response.data;
    },

    // DELETE /ebooks/:id - Delete ebook
    delete: async (id: string): Promise<void> => {
        await httpClient.delete(`${EBOOKS_ENDPOINT}/${id}`);
    },
};
