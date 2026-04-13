import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
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
        background: scrolled ? 'rgba(15,23,42,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
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

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '7px 14px', borderRadius: 8,
                    fontSize: 14, fontWeight: 500,
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
                    padding: '7px 14px', borderRadius: 8,
                    fontSize: 14, fontWeight: 500,
                    color: isActive(link.path) ? '#F1F5F9' : '#94A3B8',
                    background: isActive(link.path) ? 'rgba(255,255,255,0.08)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}}
                  onMouseLeave={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'transparent'; }}}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              to="/join"
              className="btn-gradient"
              style={{ fontSize: 13, padding: '8px 18px' }}
              data-testid="nav-join-cta"
            >
              Join the Café →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              padding: 10, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'transparent', color: '#94A3B8',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="md:hidden"
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
          data-testid="mobile-menu"
          className="md:hidden"
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
                    fontSize: 14, fontWeight: 500,
                    color: isActive(link.path) ? '#F1F5F9' : '#94A3B8',
                    background: isActive(link.path) ? 'rgba(26,86,219,0.15)' : 'transparent',
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
