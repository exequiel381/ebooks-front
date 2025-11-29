import httpClient from './httpClient';
import type {
    CreatePaymentIntentDto,
    PaymentIntent,
    PaymentStatus,
    RefundPaymentDto,
} from '../types/api';

const PAYMENTS_ENDPOINT = '/payments';

export const paymentsApi = {
    // POST /payments/create-intent - Create payment intent (Stripe/MercadoPago)
    createIntent: async (data: CreatePaymentIntentDto): Promise<PaymentIntent> => {
        const response = await httpClient.post<PaymentIntent>(
            `${PAYMENTS_ENDPOINT}/create-intent`,
            data
        );
        return response.data;
    },

    // POST /payments/confirm/:purchaseId - Confirm payment and send ebook
    confirmPayment: async (purchaseId: string): Promise<{ success: boolean; message: string }> => {
        const response = await httpClient.post<{ success: boolean; message: string }>(
            `${PAYMENTS_ENDPOINT}/confirm/${purchaseId}`
        );
        return response.data;
    },

    // GET /payments/status/:purchaseId - Get payment status
    getStatus: async (purchaseId: string): Promise<PaymentStatus> => {
        const response = await httpClient.get<PaymentStatus>(
            `${PAYMENTS_ENDPOINT}/status/${purchaseId}`
        );
        return response.data;
    },

    // POST /payments/refund/:purchaseId - Refund payment
    refund: async (purchaseId: string, data?: RefundPaymentDto): Promise<{ success: boolean; message: string }> => {
        const response = await httpClient.post<{ success: boolean; message: string }>(
            `${PAYMENTS_ENDPOINT}/refund/${purchaseId}`,
            data
        );
        return response.data;
    },

    // POST /payments/resend-ebook/:purchaseId - Resend ebook to email
    resendEbook: async (purchaseId: string): Promise<{ success: boolean; message: string }> => {
        const response = await httpClient.post<{ success: boolean; message: string }>(
            `${PAYMENTS_ENDPOINT}/resend-ebook/${purchaseId}`
        );
        return response.data;
    },
};
