import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, BookMarked, Mic, Bell, Library, Search,
  ArrowRight, User, Network, Calendar, Users, CheckCircle,
  Zap, Brain, Eye, BarChart2, Cpu, Atom, GitBranch, Globe,
  Layers, Code2, FlaskConical
} from 'lucide-react';
import useReveal from '../hooks/useReveal';

const researchAreas = [
  { label: 'Computer Vision', icon: Eye, color: '#60a5fa', bg: 'rgba(26,86,219,0.12)', members: 342 },
  { label: 'NLP', icon: MessageSquare, color: '#a78bfa', bg: 'rgba(124,58,237,0.12)', members: 289 },
  { label: 'Large Language Models', icon: Brain, color: '#34d399', bg: 'rgba(16,185,129,0.12)', members: 401 },
  { label: 'Agentic AI', icon: Zap, color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', members: 178 },
  { label: 'Generative Models', icon: Layers, color: '#fb7185', bg: 'rgba(244,63,94,0.12)', members: 256 },
  { label: 'Reinforcement Learning', icon: BarChart2, color: '#f97316', bg: 'rgba(249,115,22,0.12)', members: 145 },
  { label: 'Multimodal AI', icon: Globe, color: '#22d3ee', bg: 'rgba(6,182,212,0.12)', members: 213 },
  { label: 'Graph Neural Networks', icon: GitBranch, color: '#2dd4bf', bg: 'rgba(20,184,166,0.12)', members: 98 },
  { label: 'Efficient ML', icon: Cpu, color: '#818cf8', bg: 'rgba(99,102,241,0.12)', members: 167 },
  { label: 'AI for Science', icon: FlaskConical, color: '#a3e635', bg: 'rgba(163,230,53,0.12)', members: 89 },
  { label: 'Theory & Foundations', icon: Atom, color: '#e879f9', bg: 'rgba(232,121,249,0.12)', members: 124 },
  { label: 'Systems & MLOps', icon: Code2, color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', members: 193 },
];

const features = [
  { icon: MessageSquare, title: 'Discussion Rooms', desc: '16 topic-specific rooms covering every major CS/AI area. Computer Vision to Theory to PhD Life — each with dedicated moderators and structured community guidelines.', color: '#60a5fa', bg: 'rgba(26,86,219,0.12)' },
  { icon: BookMarked, title: 'Paper of the Week', desc: 'Every Monday, a high-impact paper opens for structured community discussion. Guided by a template, open for everyone. Community nominates every Thursday.', color: '#a78bfa', bg: 'rgba(124,58,237,0.12)' },
  { icon: Search, title: 'Reading Groups', desc: 'Async and live reading groups on your schedule. From weekly deep-dives to monthly paper clubs — find your tribe and go deep together on papers that matter.', color: '#34d399', bg: 'rgba(16,185,129,0.12)' },
  { icon: Mic, title: 'Events & Webinars', desc: 'AMAs with researchers, paper presentation practice, conference watch parties, hackathons. Never feel disconnected from the research world again.', color: '#fbbf24', bg: 'rgba(245,158,11,0.12)' },
  { icon: Bell, title: 'Research Noticeboard', desc: 'PhD positions, postdoc openings, fellowships, conference deadlines, collaboration requests — filterable, bookmarkable, and auto-archived.', color: '#fb7185', bg: 'rgba(244,63,94,0.12)' },
  { icon: Library, title: 'Resources Library', desc: 'Community-curated survey papers, tutorials, code implementations, datasets, and career resources. Upvote-ranked, searchable, and always growing.', color: '#22d3ee', bg: 'rgba(6,182,212,0.12)' },
];

const readingGroups = [
  { name: 'VLM Reading Group', area: 'Computer Vision', areaColor: '#60a5fa', format: 'Async', formatColor: '#34d399', members: 47, next: 'Every Monday' },
  { name: 'LLM Theory Circle', area: 'LLMs', areaColor: '#34d399', format: 'Live', formatColor: '#a78bfa', members: 32, next: 'Sundays, 7 PM IST' },
  { name: 'RL Fundamentals', area: 'Reinforcement Learning', areaColor: '#f97316', format: 'Async', formatColor: '#34d399', members: 28, next: 'Bi-weekly' },
  { name: 'NLP Deep Dive', area: 'NLP', areaColor: '#a78bfa', format: 'Hybrid', formatColor: '#fbbf24', members: 55, next: 'Saturdays, 6 PM IST' },
  { name: 'Diffusion Models Study', area: 'Generative Models', areaColor: '#fb7185', format: 'Async', formatColor: '#34d399', members: 41, next: 'Every Wednesday' },
  { name: 'Efficient LLM Lab', area: 'Efficient ML', areaColor: '#818cf8', format: 'Live', formatColor: '#a78bfa', members: 23, next: 'Fridays, 8 PM IST' },
];

function ReadingGroupCard({ group, index }) {
  return (
    <div className="glass-card hover-lift reveal" style={{ padding: '1.5rem', transitionDelay: `${index * 80}ms` }} data-testid={`reading-group-${index}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
        <h3 style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>{group.name}</h3>
        <span style={{ background: `${group.formatColor}15`, border: `1px solid ${group.formatColor}30`, color: group.formatColor, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
          {group.format}
        </span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ background: `${group.areaColor}15`, border: `1px solid ${group.areaColor}30`, color: group.areaColor, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 500 }}>
          {group.area}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 12 }}>
          <Users size={11} /> {group.members} members
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 12 }}>
          <Calendar size={11} /> {group.next}
        </span>
      </div>
      <Link to="/join" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#1A56DB', fontSize: 13, fontWeight: 600, textDecoration: 'none' }} data-testid={`join-group-${index}`}>
        Join Group <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function ResearchAreaChip({ area, index }) {
  return (
    <div
      className="hover-lift reveal"
      style={{
        transitionDelay: `${index * 40}ms`,
        background: area.bg, border: `1px solid ${area.color}25`,
        borderRadius: 12, padding: '0.875rem 1.25rem',
        display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      }}
      data-testid={`area-${area.label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: area.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <area.icon size={16} color={area.color} />
      </div>
      <div>
        <div style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{area.label}</div>
        <div style={{ color: '#64748B', fontSize: 11 }}>{area.members} members</div>
      </div>
    </div>
  );
}

export default function Community() {
  useReveal();

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── HERO ── */}
      <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.2) 0%, transparent 70%), #0F172A' }} data-testid="community-hero">
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label reveal" style={{ marginBottom: 14 }}>DeepIntellect Café</div>
          <h1 className="reveal delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, marginBottom: 20 }}>
            Your Research <span className="gradient-text">Home</span>
          </h1>
          <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 17, lineHeight: 1.75, maxWidth: 600, margin: '0 auto 2rem' }}>
            A purpose-built platform for Indian CS researchers. Not Discord. Not Reddit. Something we actually needed — and built from scratch.
          </p>
          <div className="reveal delay-300">
            <Link to="/join" className="btn-gradient" style={{ fontSize: 16, padding: '14px 28px', display: 'inline-flex' }} data-testid="community-join-cta">
              Join Now — It's Free <ArrowRight size={18} />
            </Link>
          </div>
          <p className="reveal delay-400" style={{ color: '#475569', fontSize: 13, marginTop: 12 }}>2,000+ researchers already inside · No credit card needed</p>

          {/* Stats row */}
          <div className="reveal delay-300" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[['16', 'Discussion Rooms'], ['12+', 'Reading Groups'], ['50+', 'Paper Discussions'], ['100%', 'Free']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{ fontSize: 28, fontWeight: 800 }}>{v}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 0' }} data-testid="community-features">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>What's Inside</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Everything to <span className="gradient-text">Do Research Together</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <div key={f.title} className="glass-card hover-lift gradient-border reveal" style={{ padding: '1.75rem', transitionDelay: `${i * 70}ms` }} data-testid={`feature-${i}`}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '5rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="how-it-works">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>Getting Started</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', position: 'relative' }}>
            {[
              { num: '01', icon: User, title: 'Create Your Researcher Profile', desc: "Set up with your institution, research area, academic links (Google Scholar, ORCID, GitHub), and what you're currently working on. Verified badge for academic emails." },
              { num: '02', icon: Network, title: 'Join Rooms & Reading Groups', desc: 'Browse 16 topic rooms and active reading groups matching your interests. Every room has pinned resources, community rules, and active ongoing discussions.' },
              { num: '03', icon: Users, title: 'Discuss, Collaborate, Grow', desc: "Post paper discussions, join reading groups, ask questions, share implementations, find collaborators. The community you've been looking for." },
            ].map((step, i) => (
              <div key={step.num} className="text-center reveal" style={{ transitionDelay: `${i * 150}ms`, textAlign: 'center' }} data-testid={`step-${i+1}`}>
                <div style={{
                  width: 80, height: 80, borderRadius: 20, margin: '0 auto 1.5rem',
                  background: 'linear-gradient(135deg, rgba(26,86,219,0.15) 0%, rgba(124,58,237,0.15) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1A56DB', fontSize: 11, fontWeight: 700 }}>{step.num}</span>
                  <step.icon size={22} color="white" />
                </div>
                <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── RESEARCH AREAS ── */}
      <section style={{ padding: '5rem 0' }} data-testid="research-areas">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>Research Areas</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 12 }}>
              Find Your <span className="gradient-text">Research Tribe</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 15 }}>12 active research areas with dedicated rooms, reading groups, and communities</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
            {researchAreas.map((area, i) => <ResearchAreaChip key={area.label} area={area} index={i} />)}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── READING GROUPS ── */}
      <section style={{ padding: '5rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="reading-groups">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <div className="section-label reveal" style={{ marginBottom: 12 }}>Active Now</div>
              <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white' }}>
                Current <span className="gradient-text">Reading Groups</span>
              </h2>
            </div>
            <Link to="/join" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1A56DB', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Start a Group <ArrowRight size={15} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {readingGroups.map((group, i) => <ReadingGroupCard key={group.name} group={group} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }} data-testid="community-cta">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,86,219,0.1) 0%, rgba(124,58,237,0.1) 100%)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 14 }}>
            Join <span className="gradient-text">2,000+ Indian CS Researchers</span>
          </h2>
          <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 16, marginBottom: 28, lineHeight: 1.75 }}>
            The community is live. Papers are being discussed. Reading groups are running every week. Don't sit this out.
          </p>
          <div className="reveal delay-300">
            <Link to="/join" className="btn-gradient" style={{ fontSize: 16, padding: '14px 28px', display: 'inline-flex' }} data-testid="community-final-cta">
              Join the Café — It's Free <ArrowRight size={18} />
            </Link>
          </div>
          <div className="reveal delay-400" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: 20, flexWrap: 'wrap' }}>
            {['No credit card', 'No spam', 'Leave anytime'].map(item => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13 }}>
                <CheckCircle size={13} color="#34d399" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
