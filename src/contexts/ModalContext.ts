import { createContext } from 'react';

export type ButtonAction = {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'link';
  action?: 'primary' | 'secondary' | 'positive' | 'negative';
};

export type ShowOptions = {
  title: string;
  subtitle?: string;
  buttons?: [ButtonAction] | [ButtonAction, ButtonAction];
};

export interface ModalContextValue {
  show: (options: ShowOptions) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
