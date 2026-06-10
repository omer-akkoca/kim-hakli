import { createContext } from 'react';
import { ShowToastProps } from '@/src/types';

export interface ToastContextType {
  show: (props: ShowToastProps) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
