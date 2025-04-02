import { createBrowserRouter } from 'react-router-dom';
import {
  ConnectionErrorPage,
  NotFoundPage,
  HomePage,
  RepositoryDetailsPage,
} from '../pages';
import { RootLayout } from '../layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { path: '/', Component: HomePage },
      {
        path: '/repo-details/:repoName',
        Component: RepositoryDetailsPage,
      },
      { path: '/connection-error', Component: ConnectionErrorPage },
      { path: '/*', Component: NotFoundPage },
    ],
  },
]);
