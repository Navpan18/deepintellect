import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Linkedin, Github, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(8,12,26,0.98)' }} data-testid="footer">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(0.75rem, 3vw, 1.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }} className="footer-brand">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 16 }} data-testid="footer-logo">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #1A56DB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, boxShadow: '0 0 20px rgba(26,86,219,0.3)', flexShrink: 0 }}>
                <Logo size={32} />
              </div>
              <div>
                <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 'clamp(14px, 3vw, 16px)' }}>DeepIntellect AI</div>
                <div style={{ color: '#475569', fontSize: 'clamp(10px, 2vw, 11px)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>Café</div>
              </div>
            </Link>
            <p style={{ color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', lineHeight: 1.75, marginBottom: 16 }}>
              Where Indian CS Research Comes Alive.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: 'https://www.youtube.com/@DeepIntellactAI', icon: Youtube, label: 'YouTube', hover: '#fb7185', testid: 'footer-youtube' },
                { href: '#', icon: Twitter, label: 'Twitter', hover: '#94a3b8', testid: 'footer-twitter' },
                { href: '#', icon: Linkedin, label: 'LinkedIn', hover: '#60a5fa', testid: 'footer-linkedin' },
                { href: '#', icon: Github, label: 'GitHub', hover: '#94a3b8', testid: 'footer-github' },
              ].map(({ href, icon: Icon, label, hover, testid }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 9, background: 'rgba(30,41,59,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#64748B', textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = hover; e.currentTarget.style.borderColor = `${hover}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  data-testid={testid}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)', marginBottom: 16 }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Community', path: '/community' },
                { label: 'Resources', path: '/resources' },
                { label: 'Join', path: '/join' },
              ].map(link => (
                <Link key={link.label} to={link.path} style={{ color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F1F5F9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                  data-testid={`footer-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)', marginBottom: 16 }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="https://www.youtube.com/@DeepIntellactAI" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F1F5F9'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >YouTube <ExternalLink size={10} /></a>
              {['Papers', 'Reading Groups', 'Noticeboard', 'Newsletter'].map(item => (
                <Link key={item} to="/community" style={{ color: '#64748B', fontSize: 'clamp(12px, 2vw, 13px)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F1F5F9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >{item}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" style={{ margin: 'clamp(1rem, 2vw, 1.5rem) 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
          <p style={{ color: '#334155', fontSize: 'clamp(11px, 2vw, 12px)' }}>
            © {new Date().getFullYear()} DeepIntellect AI
          </p>
          <p style={{ color: '#334155', fontSize: 'clamp(11px, 2vw, 12px)', fontFamily: 'JetBrains Mono, monospace' }}>
            Made in India — Free Always
          </p>
        </div>
      </div>
    </footer>
  );
}
