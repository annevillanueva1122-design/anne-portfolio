import { describe, expect, it } from 'vitest';
import { imageFile, mapAutomation, mapExperience, mapToolkitGroup, mapWebBuild, mapWorkItem, tagNames, withFallback } from './content';
import { fallbackContent } from '../data/fallback';

describe('tagNames', () => {
  it('orders tags by their join-table sort and skips dangling links', () => {
    expect(tagNames([
      { sort: 2, tags: { name: 'Slack' } },
      { sort: 0, tags: { name: 'GoHighLevel' } },
      { sort: 1, tags: null },
    ])).toEqual(['GoHighLevel', 'Slack']);
  });
  it('handles a missing relation', () => expect(tagNames(undefined)).toEqual([]));
});

describe('row mappers', () => {
  it('maps a work item row, turning null into undefined', () => {
    expect(mapWorkItem({
      sort: 0, name: 'A', type_label: 'Web', sector: 's', headline: 'h', description: 'd', live_url: null,
      work_item_tags: [{ sort: 0, tags: { name: 'GHL' } }],
    })).toEqual({ client: 'A', category: 'Web', subtitle: 's', headline: 'h', description: 'd', liveUrl: undefined, tags: ['GHL'] });
  });

  it('turns image numbers into storage file names', () => {
    expect(imageFile(7)).toBe('img-07.jpg');
    const a = mapAutomation({ sort: 0, platform: 'zapier', image_no: 17, extra_image_no: 18, title: 't', description: 'd', automation_tags: [] });
    expect([a.image, a.extraImage]).toEqual(['img-17.jpg', 'img-18.jpg']);
  });

  it('keeps an experience without a summary as an earlier role', () => {
    const e = mapExperience({
      sort: 0, period: 'Jan 2022 — Nov 2022', is_current: false, company: 'Sheik Media', role: 'GHL Specialist',
      summary: null, case_study_url: null, live_url: null, experience_tags: [],
    });
    expect(e.summary).toBeUndefined();
    expect(e.isCurrent).toBe(false);
  });

  it('sorts tools inside a group', () => {
    expect(mapToolkitGroup({ sort: 0, name: 'Code', tools: [{ sort: 1, name: 'CSS' }, { sort: 0, name: 'HTML' }] }).tools)
      .toEqual(['HTML', 'CSS']);
  });
});

describe('mapWebBuild', () => {
  it('maps a web build row with ordered tags and an optional demo', () => {
    expect(mapWebBuild({
      sort: 0, name: 'Pulse', kind: 'Mobile app', headline: 'h', description: 'd', cover_image: null,
      cover_caption: null, demo: 'pulse', live_url: null,
      web_build_tags: [{ sort: 2, tags: { name: 'Leads' } }, { sort: 1, tags: { name: 'Mobile UI' } }],
    })).toEqual({
      name: 'Pulse', kind: 'Mobile app', headline: 'h', description: 'd', coverImage: undefined,
      coverCaption: undefined, demo: 'pulse', liveUrl: undefined, tags: ['Mobile UI', 'Leads'],
    });
  });
});

describe('withFallback', () => {
  it('keeps built-in sections the database returned empty', () => {
    const empty = Object.fromEntries(Object.keys(fallbackContent).map((k) => [k, []])) as unknown as typeof fallbackContent;
    const merged = withFallback({ ...empty, sites: [{ name: 'X', category: 'Y', url: 'https://x.test' }] }, fallbackContent);
    expect(merged.sites).toHaveLength(1);
    expect(merged.work).toBe(fallbackContent.work);
  });
});
