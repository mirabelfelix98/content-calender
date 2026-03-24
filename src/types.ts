export interface PlatformPost {
  platform: 'tiktok' | 'instagram' | 'twitter';
  type: string;
  content: string;
  caption: string;
}

export interface DayContent {
  day: number;
  week: number;
  theme: string;
  pillar: string;
  isWebDay?: boolean;
  posts: PlatformPost[];
}

export interface WeekLabel {
  week: number;
  title: string;
  subtitle: string;
}
