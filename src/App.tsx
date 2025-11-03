import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetailPage from './pages/BookDetailPage';
import BookListPage from './pages/BookListPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
