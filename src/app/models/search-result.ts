export interface SearchResult {
  start: number;
  num_found: number;
  docs: BookDoc[];
}

export interface BookDoc {
  cover_i: number;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  author_key: string[];
}
