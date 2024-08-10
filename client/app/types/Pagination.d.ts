export type Pagination<T> = {
  data: T[];
  links: Link[];
  first_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string | null;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  per_page: number;
  total: number;
  path: string;
};

type Link = {
  url: string;
  label: string;
  active: boolean;
};
