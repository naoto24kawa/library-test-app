// Models
type Author = {
  id: number;
  name: string;
  books?: Book[];
};

type Book = {
  id?: number;
  title?: string;
  description?: string;
  img_path?: string;
  amount?: number;
  created_at?: string;
  updated_at?: string;
  author?: Author;
  publisher?: Publisher;
  comments?: Comment[];
  users?: User[];
  isRentable?: boolean;
  rentalTimes?: number;
  earliestReturnDate?: string;
  in_progress?: User[];
  users_count?: number;
  rental_history?: RentalHistory;
};

type Comment = {
  id: number;
  content?: string;
  book?: Book;
  created_user?: User;
  create_at?: string;
  children?: Comment[];
};

type Publisher = {
  id: number;
  name: string;
};

type RentalHistory = {
  id: number;
  user?: User;
  book?: Book;
  rental_status?: RentalStatus;
  start_date?: string;
  end_date?: string;
  note?: string;
};

type RentalStatus = {
  id: number;
  name: string;
  description?: string;
};

type User = {
  id: number;
  name?: string;
  email?: string;
  books?: Book[];
  borrowedBooks?: Book[];
  pivot?: RentalHistory;
  in_progress?: Book[];
};

type Token = {
  token: string;
  id: number;
};
