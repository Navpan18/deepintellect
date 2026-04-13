import React, { useState } from 'react';
import { Youtube, Twitter, Linkedin, Github, CheckCircle, Loader, ArrowRight } from 'lucide-react';
import axios from 'axios';
import useReveal from '../hooks/useReveal';

const API = process.env.REACT_APP_BACKEND_URL;

const researchAreas = [
  'Computer Vision', 'Natural Language Processing (NLP)', 'Large Language Models (LLMs)',
  'Agentic AI', 'Generative Models', 'Reinforcement Learning', 'Multimodal AI',
  'Graph Neural Networks', 'Efficient ML', 'AI for Science', 'Theory & Foundations',
  'Systems & MLOps', 'Other',
];

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', institution: '', research_area: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await axios.post(`${API}/api/contact`, form);
      setStatus('success'); setResponseMsg(res.data.message);
    } catch {
      setStatus('error'); setResponseMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(0.75rem, 3vw, 0) clamp(1rem, 4vw, 2rem)', position: 'relative', overflow: 'hidden' }} data-testid="contact-hero">
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        <div style={{ position: 'absolute', top: 20, right: '5%', width: 'clamp(250px, 30vw, 400px)', height: 'clamp(250px, 30vw, 400px)', background: 'radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -20, left: '5%', width: 'clamp(250px, 30vw, 350px)', height: 'clamp(250px, 30vw, 350px)', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 clamp(0.75rem, 4vw, 1.5rem)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label reveal" style={{ marginBottom: 12 }}>Join Us</div>
          <h1 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', fontWeight: 800, color: 'white', marginBottom: 12, lineHeight: 1.1 }}>
            Be Part of the <span className="gradient-text">Community</span>
          </h1>
          <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.75 }}>
            Request early access to DeepIntellect Café.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: 'clamp(2rem, 4vw, 5rem) clamp(0.75rem, 3vw, 1.5rem)', maxWidth: 680, margin: '0 auto' }} data-testid="contact-form-section">
        {status === 'success' ? (
          <div className="glass-card" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)', textAlign: 'center', animation: 'fadeInUp 0.6s ease-out forwards' }} data-testid="contact-success">
            <div style={{ width: 'clamp(60px, 12vw, 72px)', height: 'clamp(60px, 12vw, 72px)', borderRadius: '50%', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(1rem, 2vw, 1.5rem)' }}>
              <CheckCircle size={36} color="#34d399" style={{width: 'clamp(30px, 6vw, 36px)', height: 'clamp(30px, 6vw, 36px)'}} />
            </div>
            <h2 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(18px, 4vw, 24px)', marginBottom: 12 }}>You're on the List!</h2>
            <p style={{ color: '#94A3B8', marginBottom: 12, lineHeight: 1.75, fontSize: 'clamp(13px, 2vw, 14px)' }}>{responseMsg}</p>
            <p style={{ color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', lineHeight: 1.75 }}>Check your email for updates.</p>
          </div>
        ) : (
          <div className="glass-card reveal delay-200" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }} data-testid="contact-form-card">
            <h2 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(18px, 4vw, 22px)', marginBottom: 6 }}>Request Early Access</h2>
            <p style={{ color: '#94A3B8', fontSize: 'clamp(13px, 2vw, 14px)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.6 }}>
              Tell us about yourself and we'll send an invite.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }} data-testid="contact-form">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Name" required className="input-dark" data-testid="contact-name-input" />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6 }}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" required className="input-dark" data-testid="contact-email-input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6 }}>Institution / Organization *</label>
                <input name="institution" type="text" value={form.institution} onChange={handleChange} placeholder="Your institution" required className="input-dark" data-testid="contact-institution-input" />
              </div>

              <div>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6 }}>Research Area *</label>
                <select name="research_area" value={form.research_area} onChange={handleChange} required className="input-dark" style={{ appearance: 'none' }} data-testid="contact-research-area-select">
                  <option value="" disabled>Select area...</option>
                  {researchAreas.map(a => <option key={a} value={a} style={{ background: '#1E293B' }}>{a}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6 }}>
                  Message <span style={{ color: '#475569', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell us about your research, what you're working on, or what you hope to get from the community..."
                  rows={4} className="input-dark" style={{ resize: 'vertical' }}
                  data-testid="contact-message-textarea"
                />
              </div>

              {status === 'error' && (
                <div style={{ color: '#fb7185', fontSize: 'clamp(12px, 2vw, 13px)', padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem)', background: 'rgba(244,63,94,0.06)', borderRadius: 8, border: '1px solid rgba(244,63,94,0.2)' }} data-testid="contact-error">
                  {responseMsg}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-gradient" style={{ justifyContent: 'center', padding: 'clamp(10px, 2vw, 13px)', fontSize: 'clamp(13px, 2vw, 15px)', width: '100%' }} data-testid="contact-submit-btn">
                {status === 'loading' ? <><Loader size={16} className="animate-spin" /> Submitting...</> : <>Request Access <ArrowRight size={16} /></>}
              </button>
              <p style={{ color: '#475569', fontSize: 'clamp(11px, 2vw, 12px)', textAlign: 'center' }}>No spam, ever.</p>
            </form>
          </div>
        )}

        {/* Social Links */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }} data-testid="contact-social">
          <p style={{ color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>Find us on social</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', flexWrap: 'wrap' }}>
            {[
              { href: 'https://www.youtube.com/@DeepIntellactAI', icon: Youtube, label: 'YouTube', hoverColor: '#fb7185' },
              { href: '#', icon: Twitter, label: 'Twitter/X', hoverColor: '#94a3b8' },
              { href: '#', icon: Linkedin, label: 'LinkedIn', hoverColor: '#60a5fa' },
              { href: '#', icon: Github, label: 'GitHub', hoverColor: '#94a3b8' },
            ].map(({ href, icon: Icon, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
                  borderRadius: 10, background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8', textDecoration: 'none', fontSize: 13, transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = `${hoverColor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                data-testid={`contact-${label.toLowerCase().replace(/\s|\//g, '-')}`}
              >
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
