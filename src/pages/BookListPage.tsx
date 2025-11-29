import React, { useState } from 'react';
import { categories } from '../data/mockData';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import { useEbooksPaginated } from '../hooks';
import type { Ebook } from '../types/api';

const BookListPage: React.FC = () => {
  const { data: books } = useEbooksPaginated();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ebook Store</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing books in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books?.data.map((book: Ebook) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {books?.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No books found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookListPage;