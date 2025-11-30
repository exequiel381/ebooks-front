import React from 'react';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isOpen,
  onClose
}) => {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50
        w-64 bg-white dark:bg-gray-800 shadow-lg h-screen
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="p-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Browse our collection of carefully curated ebooks across various categories.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;