// Shapes the UI works with. Supabase rows are mapped into these in lib/content.ts.

export interface Kpi {
  value: number;
  from?: number;
  suffix?: string;
  label: string;
}

export interface WorkItem {
  client: string;
  category: string;
  subtitle: string;
  headline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
}

export type Platform = 'ghl' | 'zapier';

export interface Automation {
  platform: Platform;
  title: string;
  description: string;
  image: string;
  extraImage?: string;
  tags: string[];
}

export interface Site {
  name: string;
  category: string;
  url: string;
}

export interface LibraryItem {
  image: string;
  caption: string;
}

export interface Experience {
  company: string;
  role: string;
  /** e.g. 'Apr 2026 — Present' */
  period: string;
  isCurrent: boolean;
  summary?: string;
  tags: string[];
  caseStudyUrl?: string;
  liveUrl?: string;
}

export type ServiceSection = 'service' | 'approach' | 'ads';

export interface ServiceItem {
  section: ServiceSection;
  title: string;
  body: string;
  tags: string[];
}

export interface ToolCategory {
  name: string;
  tools: string[];
}

export interface Credential {
  title: string;
  detail: string;
  period: string;
  shortLabel: string;
}

export interface Content {
  kpis: Kpi[];
  work: WorkItem[];
  automations: Automation[];
  sites: Site[];
  library: LibraryItem[];
  lovableBuilds: string[];
  experiences: Experience[];
  services: ServiceItem[];
  toolkit: ToolCategory[];
  credentials: Credential[];
}

export type ViewKey =
  | 'home' | 'intro' | 'work' | 'workflows' | 'zapier' | 'lovable'
  | 'funnels' | 'experience' | 'services' | 'toolkit' | 'contact';
