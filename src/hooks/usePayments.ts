import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { paymentsApi } from '../api/paymentsApi';
import type {
    CreatePaymentIntentDto,
    PaymentIntent,
    PaymentStatus,
    RefundPaymentDto,
} from '../types/api';
import { purchaseKeys } from './usePurchases';

// Query keys
export const paymentKeys = {
    all: ['payments'] as const,
    status: (purchaseId: string) => [...paymentKeys.all, 'status', purchaseId] as const,
};

// GET /payments/status/:purchaseId - Get payment status
export const usePaymentStatus = (purchaseId: string): UseQueryResult<PaymentStatus, Error> => {
    return useQuery({
        queryKey: paymentKeys.status(purchaseId),
        queryFn: () => paymentsApi.getStatus(purchaseId),
        enabled: !!purchaseId,
        // Poll every 5 seconds while payment is pending
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            return status === 'pending' ? 5000 : false;
        },
    });
};

// POST /payments/create-intent - Create payment intent (Stripe/MercadoPago)
export const useCreatePaymentIntent = (): UseMutationResult<
    PaymentIntent,
    Error,
    CreatePaymentIntentDto
> => {
    return useMutation({
        mutationFn: paymentsApi.createIntent,
    });
};

// POST /payments/confirm/:purchaseId - Confirm payment and send ebook
export const useConfirmPayment = (): UseMutationResult<
    { success: boolean; message: string },
    Error,
    string
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: paymentsApi.confirmPayment,
        onSuccess: (_, purchaseId) => {
            // Invalidate payment status and purchase queries
            queryClient.invalidateQueries({ queryKey: paymentKeys.status(purchaseId) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(purchaseId) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
        },
    });
};

// POST /payments/refund/:purchaseId - Refund payment
export const useRefundPayment = (): UseMutationResult<
    { success: boolean; message: string },
    Error,
    { purchaseId: string; data?: RefundPaymentDto }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ purchaseId, data }) => paymentsApi.refund(purchaseId, data),
        onSuccess: (_, variables) => {
            // Invalidate payment status and purchase queries
            queryClient.invalidateQueries({ queryKey: paymentKeys.status(variables.purchaseId) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(variables.purchaseId) });
            queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
        },
    });
};

// POST /payments/resend-ebook/:purchaseId - Resend ebook to email
export const useResendEbook = (): UseMutationResult<
    { success: boolean; message: string },
    Error,
    string
> => {
    return useMutation({
        mutationFn: paymentsApi.resendEbook,
    });
};
