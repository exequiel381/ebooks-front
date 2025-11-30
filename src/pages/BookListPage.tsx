import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import { useCategories, useEbooksPaginated } from '../hooks';
import type { Ebook } from '../types/api';

const BookListPage: React.FC = () => {
  const { data: books } = useEbooksPaginated();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        categories={categories?.map(c => c.name) || []}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed bottom-6 right-6 z-30 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

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