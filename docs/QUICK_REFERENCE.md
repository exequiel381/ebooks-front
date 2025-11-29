# 📋 Quick Reference - API Hooks

## 🎯 Import Patterns

### Simple Import
```tsx
import { useEbooks, useCreatePurchase } from './hooks';
```

### Specific Imports
```tsx
import { useEbooks } from './hooks/useEbooks';
import { useCategories } from './hooks/useCategories';
```

## 🔍 Query Hooks (GET)

### Categories
```tsx
// Get all categories
const { data, isLoading, error } = useCategories();

// Get paginated categories
const { data } = useCategoriesPaginated({ page: 1, limit: 10, search: 'fiction' });

// Get single category
const { data } = useCategory(categoryId);
const { data } = useCategoryBySlug('fiction');
```

### Ebooks
```tsx
// Get all ebooks
const { data } = useEbooks();

// Get featured ebooks
const { data } = useFeaturedEbooks();

// Get paginated ebooks with filters
const { data } = useEbooksPaginated({
  page: 1,
  limit: 12,
  categoryId: 'cat-id',
  minPrice: 10,
  maxPrice: 50,
  isFeatured: true,
  sort: 'title',
  order: 'asc',
});

// Get ebooks by category
const { data } = useEbooksByCategory(categoryId);

// Get single ebook
const { data } = useEbook(ebookId);
const { data } = useEbookByIsbn('978-1234567890');
```

### Purchases
```tsx
// Get all purchases (admin)
const { data } = usePurchases();

// Get my purchases
const { data } = useMyPurchases();

// Get paginated purchases
const { data } = usePurchasesPaginated({
  page: 1,
  limit: 10,
  status: 'completed',
  userId: 'user-id',
});

// Get purchases by user
const { data } = usePurchasesByUser(userId);

// Check if ebook is purchased
const { data } = useCheckPurchase(ebookId);
// data: { purchased: boolean, purchase?: Purchase }

// Get single purchase
const { data } = usePurchase(purchaseId);
```

### Payments
```tsx
// Get payment status (auto-polls every 5s if pending)
const { data } = usePaymentStatus(purchaseId);
// data: { purchaseId, status, transactionId?, ebookUrl? }
```

## ✏️ Mutation Hooks (POST/PATCH/DELETE)

### Basic Pattern
```tsx
const mutation = useMutationHook();

// Call mutation
mutation.mutate(data, {
  onSuccess: (data) => { /* ... */ },
  onError: (error) => { /* ... */ },
});

// Or use async
try {
  const result = await mutation.mutateAsync(data);
} catch (error) {
  // handle error
}

// Check status
mutation.isPending   // boolean
mutation.isError     // boolean
mutation.isSuccess   // boolean
mutation.error       // Error | null
mutation.data        // Result | undefined
```

### Categories
```tsx
// Create
const create = useCreateCategory();
create.mutate({ name: 'Fiction', description: 'Fiction books' });

// Update
const update = useUpdateCategory();
update.mutate({ id: 'cat-id', data: { name: 'Updated' } });

// Delete
const del = useDeleteCategory();
del.mutate(categoryId);
```

### Ebooks
```tsx
// Create
const create = useCreateEbook();
create.mutate({
  title: 'My Book',
  author: 'John Doe',
  isbn: '978-1234567890',
  price: 19.99,
  categoryId: 'cat-id',
});

// Update
const update = useUpdateEbook();
update.mutate({ 
  id: ebookId, 
  data: { price: 24.99, isFeatured: true } 
});

// Delete
const del = useDeleteEbook();
del.mutate(ebookId);
```

### Purchases
```tsx
// Create purchase
const create = useCreatePurchase();
create.mutate({
  ebookId: 'ebook-id',
  paymentMethod: 'stripe', // or 'mercado_pago'
});

// Update purchase
const update = useUpdatePurchase();
update.mutate({
  id: purchaseId,
  data: { status: 'completed' },
});

// Delete purchase
const del = useDeletePurchase();
del.mutate(purchaseId);
```

### Payments
```tsx
// Create payment intent
const createIntent = useCreatePaymentIntent();
const intent = await createIntent.mutateAsync({
  purchaseId: 'purchase-id',
  paymentMethod: 'stripe',
});
// Returns: { clientSecret, paymentIntentId, amount }

// Confirm payment
const confirm = useConfirmPayment();
confirm.mutate(purchaseId);

// Refund payment
const refund = useRefundPayment();
refund.mutate({
  purchaseId: 'purchase-id',
  data: { reason: 'Customer request' },
});

// Resend ebook
const resend = useResendEbook();
resend.mutate(purchaseId);
```

## 💡 Common Patterns

### Loading State
```tsx
const { data, isLoading } = useEbooks();

if (isLoading) return <LoadingSpinner />;
return <div>{/* render data */}</div>;
```

### Error Handling
```tsx
const { data, error } = useEbooks();

if (error) {
  return <ErrorDisplay error={error} />;
}
```

### Mutation with Callbacks
```tsx
const create = useCreateEbook();

create.mutate(ebookData, {
  onSuccess: (newEbook) => {
    console.log('Created:', newEbook);
    // Navigate or show success message
  },
  onError: (error) => {
    console.error('Error:', error);
    // Show error message
  },
});
```

### Async Mutation
```tsx
const create = useCreatePurchase();
const createIntent = useCreatePaymentIntent();

const handleCheckout = async () => {
  try {
    const purchase = await create.mutateAsync({ ebookId, paymentMethod });
    const intent = await createIntent.mutateAsync({ 
      purchaseId: purchase.id, 
      paymentMethod 
    });
    // Use intent with payment SDK
  } catch (error) {
    console.error(error);
  }
};
```

### Pagination
```tsx
const [page, setPage] = useState(1);
const { data } = useEbooksPaginated({ page, limit: 12 });

// Navigation
<button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
  Previous
</button>
<button 
  onClick={() => setPage(p => p + 1)} 
  disabled={page === data?.pagination.totalPages}
>
  Next
</button>
```

### Conditional Query (disabled)
```tsx
// Only fetch if id is present
const { data } = useEbook(ebookId, {
  enabled: !!ebookId,
});
```

### Manual Refetch
```tsx
const { data, refetch } = useEbooks();

<button onClick={() => refetch()}>Refresh</button>
```

### Dependent Queries
```tsx
const { data: category } = useCategory(categoryId);
const { data: ebooks } = useEbooksByCategory(categoryId, {
  enabled: !!category, // Only fetch when category is loaded
});
```

## 🎨 UI Patterns

### Loading Button
```tsx
const create = useCreateEbook();

<button 
  onClick={handleCreate}
  disabled={create.isPending}
>
  {create.isPending ? 'Creating...' : 'Create'}
</button>
```

### Optimistic Purchase Button
```tsx
const { data: checkResult } = useCheckPurchase(ebookId);

{checkResult?.purchased ? (
  <button>Read Now ✓</button>
) : (
  <button onClick={handlePurchase}>Buy ${price}</button>
)}
```

### Payment Status Monitor
```tsx
const { data: status } = usePaymentStatus(purchaseId);

<div>
  Status: {status?.status}
  {status?.status === 'completed' && status.ebookUrl && (
    <a href={status.ebookUrl}>Download</a>
  )}
</div>
```

## 🔧 Advanced Usage

### Manual Cache Update
```tsx
import { useQueryClient } from '@tanstack/react-query';
import { ebookKeys } from './hooks/useEbooks';

const queryClient = useQueryClient();

// Get cached data
const ebooks = queryClient.getQueryData(ebookKeys.lists());

// Set cached data
queryClient.setQueryData(ebookKeys.detail(id), newEbook);

// Invalidate cache
queryClient.invalidateQueries({ queryKey: ebookKeys.all });
```

### Optimistic Update
```tsx
const update = useUpdateEbook();
const queryClient = useQueryClient();

update.mutate(
  { id, data: newData },
  {
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ 
        queryKey: ebookKeys.detail(variables.id) 
      });
      
      const previous = queryClient.getQueryData(ebookKeys.detail(variables.id));
      queryClient.setQueryData(ebookKeys.detail(variables.id), newData);
      
      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ebookKeys.detail(variables.id),
        context?.previous
      );
    },
  }
);
```

## 📚 Type Imports
```tsx
import type {
  Ebook,
  Category,
  Purchase,
  CreateEbookDto,
  UpdateEbookDto,
  EbookFilters,
  PaginatedResponse,
} from './types/api';
```

## 🛠️ Utilities
```tsx
import {
  formatErrorForUser,
  isNetworkError,
  isAuthError,
  getValidationErrors,
} from './utils/errorHandling';
```

---

**See [API_INTEGRATION.md](./docs/API_INTEGRATION.md) for complete documentation**
