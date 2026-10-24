import { useEffect } from 'react';
import { config } from '../config';

export interface Zoom { src: string; caption: string }

/** Full-screen image preview; click anywhere or press Esc to close */
export function Lightbox({ zoom, onClose }: { zoom: Zoom | null; onClose: () => void }) {
  if (!zoom) return null;
  return (
    <div className="lb" onClick={onClose}>
      <figure style={{ margin: 0 }}><img src={zoom.src} alt="" /><p>{zoom.caption}</p></figure>
    </div>
  );
}

/** Google Calendar booking page in a popup. The iframe loads only once the popup opens. */
export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="bookm" role="dialog" aria-modal="true" aria-label="Book a discovery call"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="box">
        <button className="x" type="button" aria-label="Close" onClick={onClose}>×</button>
        <iframe src={config.bookingUrl} title="Book a discovery call with May Anne" />
      </div>
    </div>
  );
}
