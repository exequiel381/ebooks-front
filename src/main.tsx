import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryProvider } from './providers/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert" className="p-4 bg-red-100 text-red-700">
          <p>Something went wrong:</p>
          <pre className="whitespace-pre-wrap">{error.message}</pre>
          <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      )}>
        <App />
      </ErrorBoundary>
    </QueryProvider>
  </StrictMode>,
)
