import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEbook, useEbooksByCategory } from '../hooks';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ebook } = useEbook(id!);
  const { data: relatedBooks } = useEbooksByCategory(ebook?.category?.id || '');


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Books
          </Link>
        </nav>

        {/* Book Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Image */}
            <div className="md:w-1/3">
              <img
                src={ebook?.coverImage}
                alt={ebook?.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Book Information */}
            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full mb-4">
                  {ebook?.category?.name}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {ebook?.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">by {ebook?.author}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {ebook?.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${ebook?.price}
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    // TODO: Implement buy functionality
                    alert(`Added "${ebook?.title}" to cart!`);
                  }}
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Book Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">Author:</span>
                    <p className="text-gray-900 dark:text-white">{ebook?.author}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">Category:</span>
                    <p className="text-gray-900 dark:text-white">{ebook?.category?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">Format:</span>
                    <p className="text-gray-900 dark:text-white">Digital Download</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">Price:</span>
                    <p className="text-gray-900 dark:text-white">${ebook?.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More in {ebook?.category?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks
              ?.filter(b => b.id !== ebook?.id)
              .slice(0, 5)
              .map((relatedebook) => (
                <Link
                  key={relatedebook?.id}
                  to={`/book/${relatedebook?.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={relatedebook?.coverImage}
                    alt={relatedebook?.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                      {relatedebook?.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{relatedebook?.author}</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">${relatedebook?.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;