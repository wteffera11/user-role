'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return <Provider store={store}>{children}</Provider>;
}