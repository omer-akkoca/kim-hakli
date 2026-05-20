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
