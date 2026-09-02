import { createContext, ReactNode } from 'react';

export type ButtonAction = {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'link';
  action?: 'primary' | 'secondary' | 'positive' | 'negative';
};

export type ShowOptions = {
  title?: string;
  subtitle?: string;
  buttons?: ButtonAction[];
  noClosable?: boolean;
  content?: ReactNode;
};

export interface ModalContextValue {
  show: (options: ShowOptions) => void;
  hide: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
