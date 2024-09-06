export type Book = {
  id: number;
  author_id: number | null;
  publisher_id: number | null;
  title: string | null;
  img_path: string | null;
  description: string | null;
  amount: number | null;
  created_user_id: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BookForm = {
  authors: Author[];
  publishers: Publisher[];
};
