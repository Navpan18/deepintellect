import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Users, Globe, Shield, ArrowRight,
  CheckCircle, XCircle, Minus, GraduationCap,
  Code2, Stethoscope
} from 'lucide-react';
import useReveal from '../hooks/useReveal';

const THANSEN_IMG = "https://customer-assets.emergentagent.com/job_1c1217d3-60c8-4e1f-a67a-586a12ae3b7f/artifacts/wokkg6ut_thansen.jpeg";
const NAVNEET_IMG = "https://customer-assets.emergentagent.com/job_1c1217d3-60c8-4e1f-a67a-586a12ae3b7f/artifacts/k261rtfv_navneet.jfif";
const SHUBHI_IMG = "https://customer-assets.emergentagent.com/job_1c1217d3-60c8-4e1f-a67a-586a12ae3b7f/artifacts/pyqojruz_shubhi.jpeg";

const comparisonRows = [
  { label: 'India-Specific Context', di: true, discord: false, reddit: false, rg: false },
  { label: 'Paper Discussion Threads', di: true, discord: 'partial', reddit: true, rg: false },
  { label: 'Structured Reading Groups', di: true, discord: false, reddit: false, rg: false },
  { label: 'YouTube Channel Integration', di: true, discord: false, reddit: false, rg: false },
  { label: 'Research Noticeboard (PhD/Jobs)', di: true, discord: false, reddit: 'partial', rg: false },
  { label: 'Platform Data Ownership', di: true, discord: false, reddit: false, rg: false },
  { label: 'LaTeX / Math Rendering', di: true, discord: false, reddit: false, rg: true },
  { label: 'Academic Profile & Reputation', di: true, discord: false, reddit: 'partial', rg: true },
  { label: 'Senior-Junior Mentorship', di: true, discord: 'partial', reddit: false, rg: false },
];

function CompareCell({ val }) {
  if (val === true) return <CheckCircle size={17} color="#34d399" style={{ margin: '0 auto', display: 'block' }} />;
  if (val === false) return <XCircle size={17} color="rgba(248,113,113,0.5)" style={{ margin: '0 auto', display: 'block' }} />;
  return <Minus size={17} color="#fbbf24" style={{ margin: '0 auto', display: 'block' }} />;
}

function FounderCard({ img, name, title, currentRole, currentOrg, education, bio, icon: Icon, accentColor, delay = 0 }) {
  return (
    <div
      className="glass-card hover-lift reveal"
      style={{ padding: '2.5rem', transitionDelay: `${delay}ms` }}
      data-testid={`founder-${name.split(' ')[0].toLowerCase()}`}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Photo */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 20, overflow: 'hidden',
            border: `2px solid ${accentColor}40`,
            boxShadow: `0 0 30px ${accentColor}25`,
          }}>
            <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{name}</h3>
          <div style={{
            background: `linear-gradient(135deg, #1A56DB, #7C3AED)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', fontWeight: 700, fontSize: 14, marginBottom: 16,
          }}>{title}</div>

          {/* Current Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={14} color={accentColor} />
            </div>
            <div>
              <span style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>Current Role</span>
              <p style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600 }}>{currentRole} <span style={{ color: '#94A3B8', fontWeight: 400 }}>at {currentOrg}</span></p>
            </div>
          </div>

          {/* Education */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(26,86,219,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <GraduationCap size={14} color="#60a5fa" />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>Education</span>
              {education.map((e, i) => (
                <p key={i} style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>{e}</p>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>{bio}</p>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, color, delay = 0 }) {
  return (
    <div className="glass-card hover-lift gradient-border reveal" style={{ padding: '1.75rem', transitionDelay: `${delay}ms` }} data-testid={`value-${title.split(' ')[0].toLowerCase()}`}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Icon size={20} color={color} />
      </div>
      <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.75 }}>{description}</p>
    </div>
  );
}

export default function About() {
  useReveal();

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }} data-testid="about-hero">
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div className="section-label reveal" style={{ marginBottom: 16 }}>About Us</div>
            <h1 className="reveal delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              The Research Community <br /><span className="gradient-text">India Needed</span>
            </h1>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 17, lineHeight: 1.75 }}>
              Built by Indian researchers who lived the problem. We know what's missing. We're building it — together.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MISSION ── */}
      <section style={{ padding: '5rem 0' }} data-testid="mission-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="reveal">
              <div className="section-label" style={{ marginBottom: 14 }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
                Build the most engaged research community for <span className="gradient-text">Indian CS/AI</span> researchers
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.8, marginBottom: 14 }}>
                India produces world-class CS researchers. But the ecosystem to support them — the peer networks, reading groups, paper discussion culture, mentorship chains — has always been scattered, hard to find, and often non-existent.
              </p>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.8 }}>
                DeepIntellect AI is the infrastructure layer for a generation of Indian researchers to find each other, learn together, and collectively push the frontier forward.
              </p>
            </div>
            <div className="reveal delay-200">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Mission', value: 'Most engaged Indian CS research community', icon: '🎯' },
                  { label: 'Vision', value: 'Default home of Indian AI/CS research discourse', icon: '🔭' },
                  { label: 'Model', value: 'Senior-Junior Mentorship & Community', icon: '🎯' },
                  { label: 'Focus', value: 'India-specific research context and ecosystem', icon: '🇮🇳' },
                ].map(item => (
                  <div key={item.label} className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(26,86,219,0.15)' }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ color: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── STORY ── */}
      <section style={{ padding: '5rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="story-section">
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-label reveal" style={{ marginBottom: 14 }}>The Story</div>
          <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 32 }}>
            Why DeepIntellect AI <span className="gradient-text">Was Built</span>
          </h2>
          <div className="reveal delay-200" style={{ borderLeft: '3px solid rgba(26,86,219,0.4)', paddingLeft: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ color: '#CBD5E1', fontSize: 17, lineHeight: 1.85, fontWeight: 500 }}>
                It started with a simple, uncomfortable truth: reading papers alone is hard, and staying motivated in Indian research is even harder.
              </p>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.85 }}>
                Indian researchers are scattered across IITs, NITs, IISERs, IISc — brilliant people working on cutting-edge problems, often in isolation. The global platforms like Discord and Reddit exist, but they don't understand India-specific context: the stipend realities, the advisor dynamics, the compute access challenges, the fellowship ecosystem unique to India.
              </p>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.85 }}>
                DeepIntellect AI started as a YouTube channel to make paper walkthroughs accessible. But a channel alone isn't enough. The real value comes from the discussion <em style={{ color: '#CBD5E1' }}>after</em> the video. From the researcher who says "I'm working on something similar." From the reading group that makes you actually finish that paper. From the PhD student who shares a fellowship opportunity you'd never have found.
              </p>
              <p style={{ color: '#F1F5F9', fontSize: 16, lineHeight: 1.85, fontWeight: 600 }}>
                DeepIntellect Café is the community we all wished existed when we started our research journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: '5rem 0' }} data-testid="comparison-section">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>Why DeepIntellect?</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              How We <span className="gradient-text">Compare</span>
            </h2>
          </div>
          <div className="glass-card reveal delay-200" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }} data-testid="comparison-table">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', color: '#94A3B8', fontSize: 13, fontWeight: 500, width: '36%' }}>Feature</th>
                    {['DeepIntellect', 'Discord', 'Reddit', 'ResearchGate'].map((h, i) => (
                      <th key={h} style={{ padding: '1.25rem 1rem', textAlign: 'center', fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'transparent' : '#64748B', background: i === 0 ? 'linear-gradient(135deg, #1A56DB, #7C3AED)' : undefined, WebkitBackgroundClip: i === 0 ? 'text' : undefined, WebkitTextFillColor: i === 0 ? 'transparent' : undefined, backgroundClip: i === 0 ? 'text' : undefined }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '0.9rem 1.5rem', color: '#CBD5E1', fontSize: 14 }}>{row.label}</td>
                      <td style={{ padding: '0.9rem 1rem' }}><CompareCell val={row.di} /></td>
                      <td style={{ padding: '0.9rem 1rem' }}><CompareCell val={row.discord} /></td>
                      <td style={{ padding: '0.9rem 1rem' }}><CompareCell val={row.reddit} /></td>
                      <td style={{ padding: '0.9rem 1rem' }}><CompareCell val={row.rg} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { icon: CheckCircle, color: '#34d399', label: 'Available' },
                { icon: Minus, color: '#fbbf24', label: 'Partial' },
                { icon: XCircle, color: 'rgba(248,113,113,0.6)', label: 'Not Available' },
              ].map(({ icon: Icon, color, label }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 12 }}>
                  <Icon size={13} color={color} /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FOUNDERS ── */}
      <section style={{ padding: '5rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="founders-section">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>The Team</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 12 }}>
              Built by Researchers, <span className="gradient-text">For Researchers</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
              We've lived the Indian research experience. We know exactly what's missing. So we're building it.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <FounderCard
              img={THANSEN_IMG}
              name="Thansen Dhrit Lahare"
              title="Founder & CEO"
              currentRole="Member of Technical Staff (MTS)"
              currentOrg="Oracle"
              icon={Code2}
              accentColor="#1A56DB"
              education={[
                'MTech in Computer Science (Specialization: AI) — IIT BHU, Varanasi',
                'BTech in Computer Science — NIT Raipur',
              ]}
              bio="Thansen built DeepIntellect AI to solve the isolation problem he personally experienced during his research journey. Having navigated both top-tier Indian research institutions — IIT BHU and NIT Raipur — and the high-performance engineering culture at Oracle, he uniquely understands both the challenges of Indian academic research and what researchers need to thrive professionally. He founded DeepIntellect AI to be the community and platform he wished had existed when he started — one that takes Indian researchers seriously, speaks their language, and genuinely accelerates their growth."
              delay={0}
            />
            <FounderCard
              img={NAVNEET_IMG}
              name="Navneet Panchayan"
              title="Co-Founder & CTO"
              currentRole="Senior Software Engineer 1"
              currentOrg="HCLSoftware"
              icon={Code2}
              accentColor="#7C3AED"
              education={[
                'MTech in Computer Science (Specialization: AI) — IIT BHU, Varanasi',
                'BTech in Computer Science — BIT Durg',
              ]}
              bio="Navneet brings deep technical expertise in ML models and Generative AI technology to DeepIntellect AI. As a Senior Software Engineer 1 at HCLSoftware and an alumnus of IIT BHU MTech CS (AI), he has extensive experience across LLMs, machine learning models, and complex AI systems. Having cleared & interviewed with top tech leaders including Oracle, Walmart, Samsung Bangalore, and more, he mentors aspiring engineers on high-impact tech interviews and cutting-edge GenAI architectures."
              delay={150}
            />
            <FounderCard
              img={SHUBHI_IMG}
              name="Dr. Shubhi Vaishya"
              title="Co-Founder & CFO"
              currentRole="Senior Resident Doctor"
              currentOrg="Institute of Medical Sciences (IMS), BHU Varanasi"
              icon={Stethoscope}
              accentColor="#10b981"
              education={[
                'MS in Obstetrics & Gynaecology — BHU, Varanasi',
                'MBBS — Banaras Hindu University',
              ]}
              bio="Dr. Shubhi brings the rigorous discipline of medical research to DeepIntellect AI. As a Senior Resident Doctor at the prestigious Institute of Medical Sciences at BHU, she understands research methodology, peer review culture, and what makes a knowledge community genuinely valuable. She oversees the financial health and strategic sustainability of DeepIntellect AI, ensuring the platform remains free and accessible while growing responsibly. Her perspective ensures DeepIntellect Café maintains the intellectual honesty and genuine community support that separates it from every other platform."
              delay={300}
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── VALUES ── */}
      <section style={{ padding: '5rem 0' }} data-testid="values-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>What We Stand For</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Community <span className="gradient-text">Values</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <ValueCard icon={Shield} title="Intellectual Honesty" description="We critique ideas, not people. Disagreement is healthy and encouraged. Peer review culture isn't optional — it's the foundation." color="#60a5fa" delay={0} />
            <ValueCard icon={Users} title="Collaboration Over Competition" description="Research advances when knowledge is shared, not hoarded. Helping peers publish is as valuable as publishing yourself." color="#a78bfa" delay={150} />
            <ValueCard icon={Globe} title="India-First Perspective" description="We center the Indian research ecosystem: IIT/NIT culture, stipend realities, compute constraints, advisor dynamics, fellowship systems." color="#34d399" delay={300} />
            <ValueCard icon={Heart} title="Senior-Junior Mentorship" description="Built for students and postgrads to share real interview experiences, guidance, and academic support." color="#fbbf24" delay={450} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '4rem 0', textAlign: 'center' }} data-testid="about-cta">
        <Link to="/join" className="btn-gradient" style={{ fontSize: 16, padding: '14px 28px' }} data-testid="about-join-cta">
          Join the Community <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
