import { useState } from 'react';
import { config } from '../../config';
import { useNav } from '../../lib/nav';
import { ContactForm } from '../ContactForm';
import { BookingModal } from '../BookingModal';
import { ViewHead } from '../ui';

const REACH = ['anne.villanueva1122@gmail.com', 'yham.gabriel11@gmail.com', '0927 790 9450'];

function CopyRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="copy"><span>{value}</span>
      <button onClick={() => navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {})}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function ContactView() {
  const go = useNav();
  const [booking, setBooking] = useState(false);
  return (
    <>
      <ViewHead eyebrow="Let's work together" title="Let's build something that converts" lede="Open to full-time and contract work in GoHighLevel, automation and front-end builds. Send over what you're working on and I'll tell you honestly whether I'm the right fit." />
      <div className="grid2">
        <article className="panel"><h3>Reach me</h3>
          {REACH.map(v => <CopyRow key={v} value={v} />)}
          <p>Metro Manila · Working worldwide</p></article>
        <article className="panel"><h3>Before we talk</h3><p>My CV has the full history, tools and references.</p>
          <div className="btnrow"><a className="btn dark" href={config.cvUrl} target="_blank" rel="noopener">Check my CV →</a><button className="btn ghost" onClick={() => go('experience')}>Read case studies</button></div></article>
      </div>
      {config.bookingUrl && <>
        <h2 className="sec">Book a discovery call</h2>
        <article className="panel"><p>45 minutes on Google Meet. Pick a time that works for you; times show in your own time zone.</p>
          <div className="btnrow"><button className="btn dark" type="button" onClick={() => setBooking(true)}>Book your discovery call with me →</button></div>
        </article>
        {booking && <BookingModal url={config.bookingUrl} onClose={() => setBooking(false)} />}
      </>}
      <h2 className="sec">Send me a message</h2>
      <article className="panel"><ContactForm /></article>
    </>
  );
}
