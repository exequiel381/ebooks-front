# API Integration Guide

This project uses **React Query** (TanStack Query) for data fetching and **Axios** for HTTP requests.

## 📁 Project Structure

```
src/
  api/              ← API client layer (axios instances)
    httpClient.ts   ← Axios instance + interceptors (auth, refresh)
    categoriesApi.ts ← Category endpoints
    ebooksApi.ts    ← Ebook endpoints
    purchasesApi.ts ← Purchase endpoints
    paymentsApi.ts  ← Payment endpoints
  
  hooks/            ← React Query hooks
    useCategories.ts
    useEbooks.ts
    usePurchases.ts
    usePayments.ts
  
  types/
    api.ts          ← TypeScript types for all API entities
  
  providers/
    QueryProvider.tsx ← React Query provider setup
```

## 🚀 Getting Started

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Authentication

The `httpClient` automatically handles:
- Adding auth tokens to requests
- Token refresh on 401 errors
- Redirecting to login when refresh fails

Tokens are stored in `localStorage`:
- `authToken` - Access token
- `refreshToken` - Refresh token

## 📚 Usage Examples

### Categories

#### Fetch all categories
```tsx
import { useCategories } from '../hooks/useCategories';

function CategoriesList() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {categories?.map(category => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
}
```

#### Create a category
```tsx
import { useCreateCategory } from '../hooks/useCategories';

function CreateCategoryForm() {
  const createCategory = useCreateCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createCategory.mutate(
      { name: 'Fiction', description: 'Fiction books' },
      {
        onSuccess: (data) => {
          console.log('Category created:', data);
        },
        onError: (error) => {
          console.error('Error creating category:', error);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={createCategory.isPending}>
        {createCategory.isPending ? 'Creating...' : 'Create Category'}
      </button>
    </form>
  );
}
```

#### Update a category
```tsx
import { useUpdateCategory } from '../hooks/useCategories';

function EditCategoryForm({ categoryId }: { categoryId: string }) {
  const updateCategory = useUpdateCategory();

  const handleUpdate = () => {
    updateCategory.mutate({
      id: categoryId,
      data: { name: 'Updated Name', isActive: true },
    });
  };

  return (
    <button onClick={handleUpdate}>Update Category</button>
  );
}
```

### Ebooks

#### Fetch featured ebooks
```tsx
import { useFeaturedEbooks } from '../hooks/useEbooks';

function FeaturedBooks() {
  const { data: ebooks, isLoading } = useFeaturedEbooks();

  return (
    <div>
      {ebooks?.map(ebook => (
        <div key={ebook.id}>
          <h3>{ebook.title}</h3>
          <p>{ebook.author}</p>
          <p>${ebook.price}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Fetch ebooks by category
```tsx
import { useEbooksByCategory } from '../hooks/useEbooks';

function CategoryEbooks({ categoryId }: { categoryId: string }) {
  const { data: ebooks, isLoading } = useEbooksByCategory(categoryId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {ebooks?.map(ebook => (
        <div key={ebook.id}>{ebook.title}</div>
      ))}
    </div>
  );
}
```

#### Create an ebook
```tsx
import { useCreateEbook } from '../hooks/useEbooks';

function CreateEbookForm() {
  const createEbook = useCreateEbook();

  const handleSubmit = () => {
    createEbook.mutate({
      title: 'My Book',
      author: 'John Doe',
      isbn: '978-3-16-148410-0',
      price: 19.99,
      categoryId: 'category-id',
      description: 'A great book',
    });
  };

  return <button onClick={handleSubmit}>Create Ebook</button>;
}
```

### Purchases

#### Fetch user's purchases
```tsx
import { useMyPurchases } from '../hooks/usePurchases';

function MyLibrary() {
  const { data: purchases, isLoading } = useMyPurchases();

  return (
    <div>
      <h2>My Library</h2>
      {purchases?.map(purchase => (
        <div key={purchase.id}>
          <p>{purchase.ebook?.title}</p>
          <p>Status: {purchase.status}</p>
          <p>Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Check if user purchased an ebook
```tsx
import { useCheckPurchase } from '../hooks/usePurchases';

function EbookCard({ ebookId }: { ebookId: string }) {
  const { data } = useCheckPurchase(ebookId);

  return (
    <div>
      {data?.purchased ? (
        <button>Read Now</button>
      ) : (
        <button>Purchase</button>
      )}
    </div>
  );
}
```

#### Create a purchase
```tsx
import { useCreatePurchase } from '../hooks/usePurchases';

function PurchaseButton({ ebookId }: { ebookId: string }) {
  const createPurchase = useCreatePurchase();

  const handlePurchase = () => {
    createPurchase.mutate(
      {
        ebookId,
        paymentMethod: 'stripe',
      },
      {
        onSuccess: (purchase) => {
          console.log('Purchase created:', purchase);
          // Proceed to payment
        },
      }
    );
  };

  return (
    <button onClick={handlePurchase} disabled={createPurchase.isPending}>
      {createPurchase.isPending ? 'Processing...' : 'Buy Now'}
    </button>
  );
}
```

### Payments

#### Create payment intent and process payment
```tsx
import { useCreatePaymentIntent, usePaymentStatus } from '../hooks/usePayments';
import { useCreatePurchase } from '../hooks/usePurchases';

function CheckoutFlow({ ebookId }: { ebookId: string }) {
  const createPurchase = useCreatePurchase();
  const createPaymentIntent = useCreatePaymentIntent();

  const handleCheckout = async () => {
    try {
      // 1. Create purchase
      const purchase = await createPurchase.mutateAsync({
        ebookId,
        paymentMethod: 'stripe',
      });

      // 2. Create payment intent
      const paymentIntent = await createPaymentIntent.mutateAsync({
        purchaseId: purchase.id,
        paymentMethod: 'stripe',
      });

      // 3. Use payment intent with Stripe/MercadoPago SDK
      console.log('Payment Intent:', paymentIntent);
      // Proceed with Stripe Elements or MercadoPago checkout
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

#### Monitor payment status
```tsx
import { usePaymentStatus } from '../hooks/usePayments';

function PaymentStatusMonitor({ purchaseId }: { purchaseId: string }) {
  // Automatically polls every 5 seconds while status is 'pending'
  const { data: status, isLoading } = usePaymentStatus(purchaseId);

  if (isLoading) return <div>Checking payment status...</div>;

  return (
    <div>
      <p>Payment Status: {status?.status}</p>
      {status?.status === 'completed' && status.ebookUrl && (
        <a href={status.ebookUrl}>Download your ebook</a>
      )}
    </div>
  );
}
```

#### Refund a payment
```tsx
import { useRefundPayment } from '../hooks/usePayments';

function RefundButton({ purchaseId }: { purchaseId: string }) {
  const refundPayment = useRefundPayment();

  const handleRefund = () => {
    refundPayment.mutate(
      {
        purchaseId,
        data: { reason: 'Customer request' },
      },
      {
        onSuccess: (result) => {
          alert(result.message);
        },
      }
    );
  };

  return (
    <button onClick={handleRefund} disabled={refundPayment.isPending}>
      Request Refund
    </button>
  );
}
```

### Pagination

#### Using paginated queries
```tsx
import { useState } from 'react';
import { useEbooksPaginated } from '../hooks/useEbooks';

function EbooksList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    page,
    limit: 10,
    sort: 'title',
    order: 'asc' as const,
  });

  const { data, isLoading } = useEbooksPaginated(filters);

  return (
    <div>
      {data?.data.map(ebook => (
        <div key={ebook.id}>{ebook.title}</div>
      ))}
      
      <div>
        <button 
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {data?.pagination.totalPages}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

## 🔑 Key Features

### Automatic Cache Management
- React Query automatically caches data
- Invalidates related queries on mutations
- Configurable stale time (5 minutes by default)

### Optimistic Updates
You can implement optimistic updates for better UX:

```tsx
const updateEbook = useUpdateEbook();

updateEbook.mutate(
  { id: ebookId, data: newData },
  {
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ebookKeys.detail(variables.id) });
      
      // Snapshot previous value
      const previousEbook = queryClient.getQueryData(ebookKeys.detail(variables.id));
      
      // Optimistically update cache
      queryClient.setQueryData(ebookKeys.detail(variables.id), newData);
      
      return { previousEbook };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ebookKeys.detail(variables.id),
        context?.previousEbook
      );
    },
  }
);
```

### Error Handling
All hooks return error information:

```tsx
const { data, error, isError, isLoading } = useEbooks();

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

## 🛠️ Available Hooks

### Categories
- `useCategories()` - Get all categories
- `useCategoriesPaginated(filters)` - Get paginated categories
- `useCategory(id)` - Get category by ID
- `useCategoryBySlug(slug)` - Get category by slug
- `useCreateCategory()` - Create category mutation
- `useUpdateCategory()` - Update category mutation
- `useDeleteCategory()` - Delete category mutation

### Ebooks
- `useEbooks()` - Get all ebooks
- `useFeaturedEbooks()` - Get featured ebooks
- `useEbooksPaginated(filters)` - Get paginated ebooks
- `useEbooksByCategory(categoryId)` - Get ebooks by category
- `useEbook(id)` - Get ebook by ID
- `useEbookByIsbn(isbn)` - Get ebook by ISBN
- `useCreateEbook()` - Create ebook mutation
- `useUpdateEbook()` - Update ebook mutation
- `useDeleteEbook()` - Delete ebook mutation

### Purchases
- `usePurchases()` - Get all purchases (admin)
- `useMyPurchases()` - Get user's purchases
- `usePurchasesPaginated(filters)` - Get paginated purchases
- `usePurchasesByUser(userId)` - Get purchases by user
- `useCheckPurchase(ebookId)` - Check if ebook is purchased
- `usePurchase(id)` - Get purchase by ID
- `useCreatePurchase()` - Create purchase mutation
- `useUpdatePurchase()` - Update purchase mutation
- `useDeletePurchase()` - Delete purchase mutation

### Payments
- `usePaymentStatus(purchaseId)` - Get payment status (auto-polls)
- `useCreatePaymentIntent()` - Create payment intent mutation
- `useConfirmPayment()` - Confirm payment mutation
- `useRefundPayment()` - Refund payment mutation
- `useResendEbook()` - Resend ebook mutation

## 🐛 Development Tools

React Query Devtools are available in development mode. Open the floating icon in the bottom-left corner to inspect:
- Active queries
- Query states
- Cache data
- Mutations

## 📝 TypeScript Support

All API calls are fully typed. Import types from `src/types/api.ts`:

```tsx
import type { Ebook, CreateEbookDto, EbookFilters } from '../types/api';
```
