import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SingleSolverPage from './pages/SingleSolverPage';
import SetSolverPage from './pages/SetSolverPage';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const router = createBrowserRouter([
  {
    path: '',
    element: <SingleSolverPage />,
  },
  {
    path: 'set',
    element: <SetSolverPage />,
  },
]);

root.render(
  <RouterProvider router={router} />
);
