import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Alum Connect', path: '/alum-connect', highlight: true },
  { label: 'Community', path: '/community' },
  { label: 'Resources', path: '/resources' },
  { label: 'YouTube', path: 'https://www.youtube.com/@DeepIntellactAI', external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      data-testid="navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', minHeight: '44px' }} data-testid="navbar-logo">
            <div style={{
              width: 36, height: 36, borderRadius: 10, overflow: 'hidden',
              background: 'linear-gradient(135deg, #1A56DB, #7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, padding: 2,
              boxShadow: '0 0 16px rgba(26,86,219,0.4)',
            }}>
              <Logo size={30} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 'clamp(13px, 3vw, 15px)', lineHeight: 1.2, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                DeepIntellect AI
              </span>
              <span style={{ color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(9px, 2vw, 10px)', letterSpacing: '0.08em' }}>
                DI Café
              </span>
            </div>
          </Link>

          {/* Desktop Nav (Hidden on screens below lg / 1024px) */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '6px 10px', borderRadius: 8,
                    fontSize: 13, fontWeight: 500,
                    color: '#94A3B8', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label} <ExternalLink size={11} />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    padding: '6px 10px', borderRadius: 8,
                    fontSize: 13, fontWeight: link.highlight ? 600 : 500,
                    color: link.highlight ? '#DDD6FE' : (isActive(link.path) ? '#F1F5F9' : '#94A3B8'),
                    background: link.highlight ? 'rgba(124, 58, 237, 0.2)' : (isActive(link.path) ? 'rgba(255,255,255,0.08)' : 'transparent'),
                    border: link.highlight ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!isActive(link.path) && !link.highlight) { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
                  onMouseLeave={e => { if (!isActive(link.path) && !link.highlight) { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA (Hidden on screens below lg / 1024px) */}
          <div className="hidden lg:flex">
            <Link
              to="/join"
              className="btn-gradient"
              style={{ fontSize: 13, padding: '7px 16px' }}
              data-testid="nav-join-cta"
            >
              Join the Café →
            </Link>
          </div>

          {/* Mobile/Tablet toggle button (ONLY visible below 1024px) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)', color: '#F1F5F9',
              minHeight: '40px',
              minWidth: '40px',
            }}
            className="flex lg:hidden items-center justify-center"
            data-testid="nav-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet dropdown menu (ONLY visible below 1024px when open) */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
          data-testid="mobile-menu"
          className="block lg:hidden"
        >
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 14px', borderRadius: 8,
                    fontSize: 14, fontWeight: 500,
                    color: '#94A3B8', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    minHeight: '44px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}
                  data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    padding: '12px 14px', borderRadius: 8,
                    fontSize: 14, fontWeight: link.highlight ? 700 : 500,
                    color: link.highlight ? '#C084FC' : (isActive(link.path) ? '#F1F5F9' : '#94A3B8'),
                    background: isActive(link.path) ? 'rgba(26,86,219,0.15)' : (link.highlight ? 'rgba(124,58,237,0.15)' : 'transparent'),
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
                  onMouseLeave={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}}
                  data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />
            <Link
              to="/join"
              className="btn-gradient"
              style={{ fontSize: 13, padding: '10px 18px', marginTop: 4, width: '100%', justifyContent: 'center' }}
              data-testid="nav-mobile-join-cta"
            >
              Join the Café →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
