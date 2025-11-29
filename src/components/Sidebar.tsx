import React from 'react';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 transition-colors duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h2>
        <ThemeToggle />
      </div>

      <nav className="p-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
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
  );
};

export default Sidebar;