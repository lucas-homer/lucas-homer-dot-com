import { ReadTimeResults } from 'reading-time';

export type UnionFromKeys<T> = T[keyof T];

export const FormStatuses = {
  Initial: 'Initial',
  Loading: 'Loading',
  Success: 'Success',
  Error: 'Error'
} as const;

export type FormStatus = UnionFromKeys<typeof FormStatuses>;

export type FormState = {
  status: FormStatus;
  message?: string;
};

export type Frontmatter = {
  wordCount: number;
  readingTime: ReadTimeResults;
  slug: any | null;
  title?: string;
  publishedAt?: string;
  lastUpdated?: string;
  summary?: string;
  image?: string;
  topics?: Array<string>;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};
