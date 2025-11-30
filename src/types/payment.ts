import type { PaymentMethod, PurchaseStatus } from './purchase';

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
