import type { Credential, ToolCategory } from '../types';
import { ViewHead } from './shared';

export function ToolkitView({ toolkit, credentials }: { toolkit: ToolCategory[]; credentials: Credential[] }) {
  return (
    <>
      <ViewHead eyebrow="What I work with" title="Toolkit & Credentials" lede="The platforms, languages and tools I use day to day." />
      <div className="grid3">{toolkit.map((c) => (
        <article className="panel" key={c.name}><h3>{c.name}</h3><div className="chips">{c.tools.map((t) => <span key={t}>{t}</span>)}</div></article>
      ))}</div>
      <h2 className="sec">Education &amp; training</h2>
      <div className="grid3">{credentials.map((c) => (
        <article className="panel" key={c.title}><p className="meta">{c.period}</p><h3>{c.title}</h3><p>{c.detail}</p></article>
      ))}</div>
    </>
  );
}
