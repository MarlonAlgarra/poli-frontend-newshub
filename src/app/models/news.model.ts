export interface Story {
  slug: string;
  category: string;
  theme?: string;
  date: string;
  author?: string;
  authorRole?: string;
  readTime?: string;
  title: string;
  description: string;
  image: string;
  desarrollo: string;
  /** Solo presente en noticias del catálogo; usado para ordenar. */
  order?: number;
}

export interface EditorPick {
  category: string;
  thumb: string;
  title: string;
  author: string;
}
