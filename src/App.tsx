import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/shared/components';
import { router } from '@/routes';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
