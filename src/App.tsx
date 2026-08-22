import router from '@/routes/router';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from '@/components/common/ToastProvider';
import AuthProvider from './providers/AuthProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
