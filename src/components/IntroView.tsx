import { media } from '../config';
import { useActions, ViewHead } from './shared';

export function IntroView() {
  const { go } = useActions();
  return (
    <>
      <ViewHead eyebrow="Meet May Anne" title="Intro Video"
        lede="A two-minute introduction to who I am, how I work and the platforms I build on. Press play and turn the sound on." />
      <div className="intro">
        <div className="vid">
          <video src={media('video-01.mp4')} poster={media('img-20.jpg')} controls playsInline preload="metadata"
            aria-label="Introduction video from May Anne Guevarra" />
        </div>
        <article className="panel">
          <h3>Hi, I'm May Anne</h3>
          <p className="role-line">AI Automation Specialist for digital marketing businesses</p>
          <p>I help you create a simpler working system for your business. I connect the tools you already use, from GoHighLevel to HubSpot, Salesforce and many more, so leads, follow-up and reporting run on their own instead of through a pile of manual steps.</p>
          <div className="list">
            <div className="li">Based in<small>Metro Manila, PH</small></div>
            <div className="li">Tools<small>GHL · HubSpot · Salesforce · more</small></div>
            <div className="li">Available for<small>Full-time &amp; contract</small></div>
          </div>
          <div className="btnrow">
            <button className="btn dark" onClick={() => go('work')}>See my work</button>
            <button className="btn ghost" onClick={() => go('contact')}>Get in touch</button>
          </div>
        </article>
      </div>
    </>
  );
}
