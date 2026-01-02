export enum View {
  DASHBOARD = 'DASHBOARD',
  CLIPPER = 'CLIPPER',
  WHOP_ENGINE = 'WHOP_ENGINE',
  CONNECTIONS = 'CONNECTIONS',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS'
}

export interface ClipMetadata {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  viralityScore: number;
  reasoning: string;
  suggestedHashtags: string[];
}

export enum ClipStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  FAILED = 'FAILED'
}

export enum SocialPlatform {
  YOUTUBE_SHORTS = 'YouTube Shorts',
  TIKTOK = 'TikTok',
  INSTAGRAM = 'Instagram',
  SNAPCHAT = 'Snapchat Spotlight',
  TWITTER = 'Twitter'
}

export interface ConnectedAccount {
  platform: SocialPlatform | 'Whop';
  username: string;
  connected: boolean;
  avatarUrl?: string;
}

export interface ProcessedClip extends ClipMetadata {
  status: ClipStatus;
  videoUrl: string; // The source video
  uploadUrl?: string; // The result URL
  sharedTo?: SocialPlatform[];
  sourceType?: 'MANUAL' | 'WHOP_AUTOPILOT';
  whopDealId?: string;
}

export interface VideoInfo {
  url: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
}

export interface WhopDeal {
  id: string;
  name: string;
  category: string;
  commission: string;
  monthlyVolume: string;
  imageUrl: string;
  relatedVideoUrl: string;
}

export interface WhopEngineLog {
  id: string;
  timestamp: Date;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR' | 'DEAL_FOUND';
  deal?: WhopDeal;
}