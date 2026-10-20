export type SiteTexts = Record<string, string>;

export interface Show {
  id: string;
  title: string;
  group_name: string | null;
  date: string;
  time: string | null;
  place: string | null;
  price: string | null;
  image_url: string | null;
  description: string | null;
  published: boolean;
}

export type PostCategory = 'Notícia' | 'História';

export interface Post {
  id: string;
  title: string;
  category: PostCategory;
  date: string;
  image_url: string | null;
  excerpt: string | null;
  published: boolean;
}

export interface Member {
  id: string;
  position: number;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
  link_url: string | null;
  link_label: string | null;
}

export interface Video {
  id: string;
  position: number;
  title: string;
  who: string | null;
  href: string;
}

export interface Podcast {
  id: string;
  position: number;
  n: string | null;
  title: string;
  href: string;
}

export interface Photo {
  id: string;
  position: number;
  caption: string;
  taken_when: string | null;
  src: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface AdminUser {
  user_id: string;
  email: string;
  created_at: string;
}

export interface SiteContent {
  texts: SiteTexts;
  shows: Show[];
  posts: Post[];
  members: Member[];
  videos: Video[];
  podcasts: Podcast[];
  photos: Photo[];
}

export type ResourceTable = 'shows' | 'posts' | 'members' | 'videos' | 'podcasts' | 'photos';

export const CONTACT_SUBJECTS = [
  'Quero entrar em contato',
  'Tenho uma sugestão',
  'Quero fazer parte do movimento',
  'Imprensa',
] as const;
export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

// ---------- História (linha do tempo por ano) ----------

export type DatePrecision = 'day' | 'month' | 'year';
export type HistoryKind = 'postagens' | 'filipetas' | 'clipagens';

export interface HistoryPost {
  id: string;
  slug: string;
  title: string;
  event_date: string;
  date_precision: DatePrecision;
  date_label: string | null;
  group_name: string | null;
  city: string | null;
  venue: string | null;
  body: string | null;
  cover_url: string | null;
  photos: string[];
  published: boolean;
}

export interface HistoryFlyer {
  id: string;
  event_date: string;
  date_precision: DatePrecision;
  image_url: string;
  caption: string | null;
  position: number;
}

export interface HistoryClipping {
  id: string;
  event_date: string;
  date_precision: DatePrecision;
  image_url: string;
  newspaper: string | null;
  caption: string | null;
  position: number;
}

export interface HistoryIntro {
  year: number;
  kind: 'filipetas' | 'clipagens';
  body: string;
}

export interface HistoryYear {
  year: number;
  postagens: number;
  filipetas: number;
  clipagens: number;
}
