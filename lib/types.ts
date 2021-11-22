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

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  stars: number;
};

export type Gumroad = {
  sales: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};
