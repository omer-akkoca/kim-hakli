import { useContext } from 'react';
import { ModalContext, ModalContextValue } from '@/src/contexts';

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used inside <ModalProvider>');
  }
  return ctx;
}
