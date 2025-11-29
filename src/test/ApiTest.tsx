/**
 * Simple component to test the API integration
 * Import this in App.tsx to test: import { ApiTest } from './test/ApiTest';
 */

import { useCategories, useEbooks } from '../hooks';

export function ApiTest() {
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
    const { data: ebooks, isLoading: ebooksLoading, error: ebooksError } = useEbooks();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>

            {/* Categories Test */}
            <div className="mb-8 border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                {categoriesLoading && <p className="text-gray-600">Loading categories...</p>}
                {categoriesError && <p className="text-red-600">Error: {categoriesError.message}</p>}
                {categories && (
                    <div>
                        <p className="text-green-600 mb-2">✅ Successfully loaded {categories.length} categories</p>
                        <ul className="list-disc list-inside space-y-1">
                            {categories.map(cat => (
                                <li key={cat.id} className="text-sm">
                                    {cat.name} <span className="text-gray-500">({cat.slug})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Ebooks Test */}
            <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Ebooks</h2>
                {ebooksLoading && <p className="text-gray-600">Loading ebooks...</p>}
                {ebooksError && <p className="text-red-600">Error: {ebooksError.message}</p>}
                {ebooks && (
                    <div>
                        <p className="text-green-600 mb-2">✅ Successfully loaded {ebooks.length} ebooks</p>
                        <ul className="list-disc list-inside space-y-1">
                            {ebooks.slice(0, 5).map(ebook => (
                                <li key={ebook.id} className="text-sm">
                                    {ebook.title} by {ebook.author} - ${ebook.price}
                                </li>
                            ))}
                            {ebooks.length > 5 && (
                                <li className="text-gray-500 text-sm">...and {ebooks.length - 5} more</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Connection Status */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'}
                </p>
                <p className="text-sm text-blue-800 mt-2">
                    <strong>Status:</strong> {
                        (!categoriesLoading && !ebooksLoading && !categoriesError && !ebooksError)
                            ? '✅ Connected'
                            : (categoriesError || ebooksError)
                                ? '❌ Connection Error'
                                : '⏳ Connecting...'
                    }
                </p>
            </div>
        </div>
    );
}
