export interface AuthorSearch {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Author[];
}

export interface Author {
  key: string;
  text: string[];
  type: string;
  name: string;
  alternate_names: string[];
  birth_date: string;
  top_work: string;
  work_count: number;
  top_subjects: string[];
  imageUrl: string;
  _version_: number;
}
