import { CREDIT_FILTERS } from "../constants/values";

export interface ICategory {
  id: string;
  code: string;
  name: string;
  created_at: string;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export type CreditFilter =  (typeof CREDIT_FILTERS)[number]['value'];

export type ToastType = 'error' | 'success';
export type ShowToastProps = { type?: ToastType; title: string; description: string; duration?: number };

export interface IAppConfig {
  version: string;
  update_message: string;
}