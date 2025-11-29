import type { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    statusCode?: number;
    code?: string;
    details?: unknown;
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
    if (!error) return 'An unknown error occurred';

    // Axios error
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;

        // Server responded with error
        if (axiosError.response?.data) {
            const data = axiosError.response.data;
            if (typeof data === 'string') return data;
            if (data.message) return data.message;
        }

        // Network error
        if (axiosError.message) return axiosError.message;
    }

    // Standard Error
    if (error instanceof Error) {
        return error.message;
    }

    // String error
    if (typeof error === 'string') {
        return error;
    }

    // Object with message
    if (typeof error === 'object' && error !== null && 'message' in error) {
        return String((error as { message: unknown }).message);
    }

    return 'An unexpected error occurred';
}

/**
 * Check if error is an Axios error
 */
function isAxiosError(error: unknown): error is AxiosError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        error.isAxiosError === true
    );
}

/**
 * Get HTTP status code from error
 */
export function getErrorStatusCode(error: unknown): number | undefined {
    if (isAxiosError(error)) {
        return (error as AxiosError).response?.status;
    }
    return undefined;
}

/**
 * Check if error is a specific HTTP status code
 */
export function isErrorStatus(error: unknown, statusCode: number): boolean {
    return getErrorStatusCode(error) === statusCode;
}

/**
 * Check if error is a network error (no response)
 */
export function isNetworkError(error: unknown): boolean {
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return !axiosError.response && Boolean(axiosError.request);
    }
    return false;
}

/**
 * Check if error is an authentication error (401 or 403)
 */
export function isAuthError(error: unknown): boolean {
    const status = getErrorStatusCode(error);
    return status === 401 || status === 403;
}

/**
 * Check if error is a not found error (404)
 */
export function isNotFoundError(error: unknown): boolean {
    return isErrorStatus(error, 404);
}

/**
 * Check if error is a validation error (400)
 */
export function isValidationError(error: unknown): boolean {
    return isErrorStatus(error, 400);
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: unknown): boolean {
    const status = getErrorStatusCode(error);
    return status !== undefined && status >= 500 && status < 600;
}

/**
 * Format error for user display
 */
export function formatErrorForUser(error: unknown): string {
    if (isNetworkError(error)) {
        return 'Network error. Please check your internet connection.';
    }

    if (isAuthError(error)) {
        return 'Authentication required. Please log in again.';
    }

    if (isNotFoundError(error)) {
        return 'The requested resource was not found.';
    }

    if (isServerError(error)) {
        return 'Server error. Please try again later.';
    }

    if (isValidationError(error)) {
        return getErrorMessage(error);
    }

    return getErrorMessage(error);
}

/**
 * Log error with context for debugging
 */
export function logError(error: unknown, context?: string): void {
    const message = getErrorMessage(error);
    const statusCode = getErrorStatusCode(error);

    console.error('API Error:', {
        context,
        message,
        statusCode,
        error,
    });
}

/**
 * Get validation errors from API response
 */
export function getValidationErrors(error: unknown): Record<string, string[]> | null {
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        const data = axiosError.response?.data;

        if (data && typeof data === 'object' && 'details' in data) {
            const details = data.details;
            if (details && typeof details === 'object') {
                return details as Record<string, string[]>;
            }
        }
    }

    return null;
}
