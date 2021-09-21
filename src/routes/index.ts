import React from 'react';

const Routes = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../containers/home')),
  },
];

export default Routes;
