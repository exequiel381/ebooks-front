import type { PaginationParams } from './common';
import type { Ebook } from './ebook';

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
