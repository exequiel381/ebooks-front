import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../data/mockData';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/book/${book.id}`}>
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">by {book.author}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600 dark:text-green-400">${book.price}</span>
          <button 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement buy functionality
              alert(`Added "${book.title}" to cart!`);
            }}
          >
            Buy Now
          </button>
        </div>
        
        <div className="mt-2">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
            {book.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;