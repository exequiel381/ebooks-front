# Ebook Store - React App

A modern and clean React application for selling ebooks with category filtering, detailed book views, and dark/light theme support.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)

## 🚀 Features

### 📚 Book List Page
- Display all ebooks from mock data
- **Category filtering** with sidebar navigation
- Clean, responsive card layout
- "Buy" button on each book card
- Support for 5 categories: Programming, Business, Science Fiction, Self-Help, History

### 📖 Book Detail Page
- Detailed book information (title, author, price, description)
- High-quality book images from Unsplash
- "Back" button navigation
- **Related books section** showing other books in the same category
- Purchase button with cart simulation

### 🌙 Dark/Light Theme Toggle
- **Theme toggle button** in the sidebar header
- **Persistent theme choice** via localStorage
- Smooth transitions between themes
- Complete dark mode support across all components

### 🎨 Modern Design
- **Responsive design** that works on all devices
- Clean, minimal UI with professional styling
- Hover effects and smooth animations
- Accessibility features with proper ARIA labels

## 🛠️ Tech Stack

- **React 19** - Latest React with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Vite** - Fast development server and build tool
- **ESLint** - Code linting and quality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BookCard.tsx       # Individual book card component
│   ├── Sidebar.tsx        # Category sidebar with theme toggle
│   └── ThemeToggle.tsx    # Theme toggle button
├── contexts/
│   ├── ThemeContext.tsx           # Theme provider component
│   └── ThemeContextInstance.ts    # Theme context instance
├── data/
│   └── mockData.ts        # Mock book data with TypeScript interfaces
├── hooks/
│   └── useTheme.ts        # Custom theme hook
├── pages/
│   ├── BookListPage.tsx   # Main book listing page
│   └── BookDetailPage.tsx # Individual book detail page
├── types/
│   └── theme.ts           # Theme type definitions
├── App.tsx                # Main app with routing
├── main.tsx              # App entry point
└── index.css             # Tailwind CSS and custom styles
```

## 📚 Mock Data

The app includes **11 sample books** across **5 categories**:

- **Programming** (3 books): Clean Code, JavaScript: The Good Parts, You Don't Know JS
- **Business** (2 books): The Lean Startup, Good to Great
- **Science Fiction** (2 books): Dune, The Martian
- **Self-Help** (2 books): Atomic Habits, The 7 Habits of Highly Effective People
- **History** (2 books): Sapiens, The Guns of August

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/exequiel381/ebooks-front.git
cd ebooks-front
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎯 Key Features in Detail

### Theme System
- **Context-based theme management** with proper Fast Refresh support
- **Automatic theme persistence** in localStorage
- **System preference detection** (defaults to light theme)
- **Smooth transitions** on theme changes

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly interactions** on mobile devices
- **Optimized images** with proper aspect ratios

### Code Quality
- **TypeScript strict mode** for type safety
- **ESLint configuration** with React-specific rules
- **Component separation** following React best practices
- **Custom hooks** for reusable logic

## 🔮 Future Enhancements

- [ ] **Shopping cart functionality** with local storage
- [ ] **User authentication** and user profiles
- [ ] **Payment processing** integration
- [ ] **Search functionality** with filters
- [ ] **Book reviews and ratings** system
- [ ] **Wishlist feature** for favorite books
- [ ] **Book recommendations** based on categories
- [ ] **Advanced filtering** (price range, author, etc.)
- [ ] **API integration** for real book data
- [ ] **Progressive Web App** (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes. Feel free to use it as a learning resource or starting point for your own projects.

## 🙏 Acknowledgments

- **Unsplash** for the beautiful book cover images
- **Tailwind CSS** for the excellent styling framework
- **React team** for the amazing library
- **Vite** for the lightning-fast development experience

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**