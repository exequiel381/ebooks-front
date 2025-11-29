// Common types
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

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

// Purchase types
export type PurchaseStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'stripe' | 'mercado_pago';

export interface Purchase {
    id: string;
    userId: string;
    ebookId: string;
    ebook?: Ebook;
    amount: number;
    status: PurchaseStatus;
    paymentMethod: PaymentMethod;
    paymentIntentId?: string;
    transactionId?: string;
    purchasedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePurchaseDto {
    ebookId: string;
    paymentMethod: PaymentMethod;
}

export interface UpdatePurchaseDto {
    status?: PurchaseStatus;
    transactionId?: string;
}

export interface PurchaseFilters extends PaginationParams {
    userId?: string;
    ebookId?: string;
    status?: PurchaseStatus;
    paymentMethod?: PaymentMethod;
    startDate?: string;
    endDate?: string;
}

// Payment types
export interface CreatePaymentIntentDto {
    purchaseId: string;
    paymentMethod: PaymentMethod;
}

export interface PaymentIntent {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
}

export interface PaymentStatus {
    purchaseId: string;
    status: PurchaseStatus;
    transactionId?: string;
    ebookUrl?: string;
}

export interface RefundPaymentDto {
    reason?: string;
}
