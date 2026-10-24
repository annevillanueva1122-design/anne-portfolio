import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Automation, Content, Credential, Experience, Kpi, LibraryItem, ServiceItem, Site, ToolCategory, WorkItem,
} from '../types';

// ---- Row shapes as they come back from Supabase (see supabase/migrations) ----

export interface TagLink { sort: number; tags: { name: string } | null }

export interface KpiRow { sort: number; value: number; from_value: number | null; suffix: string | null; label: string }
export interface WorkItemRow {
  sort: number; name: string; type_label: string; sector: string; headline: string; description: string;
  live_url: string | null; work_item_tags: TagLink[];
}
export interface AutomationRow {
  sort: number; platform: 'ghl' | 'zapier'; image_no: number; extra_image_no: number | null;
  title: string; description: string; automation_tags: TagLink[];
}
export interface SiteRow { sort: number; name: string; category: string; url: string }
export interface LibraryRow { sort: number; image_no: number; caption: string }
export interface LovableRow { sort: number; name: string }
export interface ExperienceRow {
  sort: number; period: string; is_current: boolean; company: string; role: string;
  summary: string | null; case_study_url: string | null; live_url: string | null; experience_tags: TagLink[];
}
export interface OfferingRow { sort: number; kind: 'service' | 'approach' | 'ads'; title: string; description: string; offering_tags: TagLink[] }
export interface ToolkitGroupRow { sort: number; name: string; tools: { sort: number; name: string }[] }
export interface CredentialRow { sort: number; title: string; short_label: string; period: string; detail: string }

// ---- Pure mappers (unit tested) ----

const bySort = <T extends { sort: number }>(a: T, b: T) => a.sort - b.sort;
const opt = <T>(v: T | null | undefined): T | undefined => (v == null ? undefined : v);

/** Ordered tag names from a join-table relation, skipping dangling links */
export const tagNames = (links: TagLink[] | null | undefined): string[] =>
  [...(links ?? [])].sort(bySort).flatMap((l) => (l.tags ? [l.tags.name] : []));

/** Storage file name for an image number: 7 -> 'img-07.jpg' */
export const imageFile = (no: number) => `img-${String(no).padStart(2, '0')}.jpg`;

export const mapKpi = (r: KpiRow): Kpi => ({
  value: r.value, label: r.label, from: opt(r.from_value), suffix: opt(r.suffix),
});

export const mapWorkItem = (r: WorkItemRow): WorkItem => ({
  client: r.name, category: r.type_label, subtitle: r.sector, headline: r.headline,
  description: r.description, liveUrl: opt(r.live_url), tags: tagNames(r.work_item_tags),
});

export const mapAutomation = (r: AutomationRow): Automation => ({
  platform: r.platform, title: r.title, description: r.description, image: imageFile(r.image_no),
  extraImage: r.extra_image_no ? imageFile(r.extra_image_no) : undefined, tags: tagNames(r.automation_tags),
});

export const mapExperience = (r: ExperienceRow): Experience => ({
  company: r.company, role: r.role, period: r.period, isCurrent: r.is_current, summary: opt(r.summary),
  caseStudyUrl: opt(r.case_study_url), liveUrl: opt(r.live_url), tags: tagNames(r.experience_tags),
});

export const mapOffering = (r: OfferingRow): ServiceItem => ({
  section: r.kind, title: r.title, body: r.description, tags: tagNames(r.offering_tags),
});

export const mapToolkitGroup = (r: ToolkitGroupRow): ToolCategory => ({
  name: r.name, tools: [...(r.tools ?? [])].sort(bySort).map((t) => t.name),
});

export const mapCredential = (r: CredentialRow): Credential => ({
  title: r.title, detail: r.detail, period: r.period, shortLabel: r.short_label,
});

export const mapSite = (r: SiteRow): Site => ({ name: r.name, category: r.category, url: r.url });
export const mapLibrary = (r: LibraryRow): LibraryItem => ({ image: imageFile(r.image_no), caption: r.caption });

// ---- Loader ----

const TAGS = 'sort, tags(name)';

/** Loads all portfolio content in parallel. Throws if any table fails, so the caller can fall back. */
export async function loadContent(db: SupabaseClient): Promise<Content> {
  const q = <T,>(table: string, select = '*') =>
    db.from(table).select(select).order('sort').then(({ data, error }) => {
      if (error) throw new Error(`${table}: ${error.message}`);
      return (data ?? []) as unknown as T[];
    });

  const [kpis, work, automations, sites, library, lovable, experiences, offerings, toolkit, credentials] =
    await Promise.all([
      q<KpiRow>('kpis'),
      q<WorkItemRow>('work_items', `*, work_item_tags(${TAGS})`),
      q<AutomationRow>('automations', `*, automation_tags(${TAGS})`),
      q<SiteRow>('sites'),
      q<LibraryRow>('library_shots'),
      q<LovableRow>('lovable_builds'),
      q<ExperienceRow>('experiences', `*, experience_tags(${TAGS})`),
      q<OfferingRow>('offerings', `*, offering_tags(${TAGS})`),
      q<ToolkitGroupRow>('toolkit_groups', '*, tools(sort, name)'),
      q<CredentialRow>('credentials'),
    ]);

  return {
    kpis: kpis.map(mapKpi),
    work: work.map(mapWorkItem),
    automations: automations.map(mapAutomation),
    sites: sites.map(mapSite),
    library: library.map(mapLibrary),
    lovableBuilds: lovable.map((r) => r.name),
    experiences: experiences.map(mapExperience),
    services: offerings.map(mapOffering),
    toolkit: toolkit.map(mapToolkitGroup),
    credentials: credentials.map(mapCredential),
  };
}

/** Keeps the built-in copy for any section the database returned empty, so a half-filled DB never blanks the page */
export function withFallback(loaded: Content, fallback: Content): Content {
  const out = { ...loaded };
  for (const key of Object.keys(fallback) as (keyof Content)[]) {
    if (!loaded[key]?.length) (out as Record<keyof Content, unknown>)[key] = fallback[key];
  }
  return out;
}
