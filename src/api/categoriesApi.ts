import httpClient from './httpClient';
import type {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
    CategoryFilters,
    PaginatedResponse,
} from '../types/api';

const CATEGORIES_ENDPOINT = '/categories';

export const categoriesApi = {
    // GET /categories - Get all active categories
    getAll: async (): Promise<Category[]> => {
        const response = await httpClient.get<Category[]>(CATEGORIES_ENDPOINT);
        return response.data;
    },

    // POST /categories - Create new category
    create: async (data: CreateCategoryDto): Promise<Category> => {
        const response = await httpClient.post<Category>(CATEGORIES_ENDPOINT, data);
        return response.data;
    },

    // GET /categories/paginated - Get paginated categories with filters
    getPaginated: async (filters?: CategoryFilters): Promise<PaginatedResponse<Category>> => {
        const response = await httpClient.get<PaginatedResponse<Category>>(
            `${CATEGORIES_ENDPOINT}/paginated`,
            { params: filters }
        );
        return response.data;
    },

    // GET /categories/:id - Get category by ID
    getById: async (id: string): Promise<Category> => {
        const response = await httpClient.get<Category>(`${CATEGORIES_ENDPOINT}/${id}`);
        return response.data;
    },

    // GET /categories/slug/:slug - Get category by slug
    getBySlug: async (slug: string): Promise<Category> => {
        const response = await httpClient.get<Category>(`${CATEGORIES_ENDPOINT}/slug/${slug}`);
        return response.data;
    },

    // PATCH /categories/:id - Update category
    update: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
        const response = await httpClient.patch<Category>(`${CATEGORIES_ENDPOINT}/${id}`, data);
        return response.data;
    },

    // DELETE /categories/:id - Delete category
    delete: async (id: string): Promise<void> => {
        await httpClient.delete(`${CATEGORIES_ENDPOINT}/${id}`);
    },
};
