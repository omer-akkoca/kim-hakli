import React, { PropsWithChildren, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks';

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      queryClient.clear();
    }
  }, [user?.id]);

  return children;
};

export { QueryProvider };
