import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Users, Rss, Play, ArrowRight, MessageSquare,
  Calendar, BookMarked, Bell, Library, ChevronRight,
  Star, ExternalLink, Zap, Globe, Award, FileText, Tag
} from 'lucide-react';
import NeuralCanvas from '../components/NeuralCanvas';
import useReveal from '../hooks/useReveal';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

// ── Top Papers Data ──
const topPapers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit et al. — Google Brain",
    venue: "NeurIPS", year: "2017",
    abstract: "The Transformer architecture based solely on attention mechanisms, dispensing with recurrence and convolutions. Changed NLP forever. This is the paper that started it all — every LLM you use today is built on this foundation.",
    tags: ["Transformers", "Attention", "NLP", "Foundational"],
    discussions: 142, accent: "paper-accent-violet", areaBadge: "badge-violet",
    arxiv: "1706.03762",
  },
  {
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Dosovitskiy, Beyer, Kolesnikov et al. — Google Brain",
    venue: "ICLR", year: "2021",
    abstract: "Vision Transformers (ViT) show that pure transformer architectures can achieve state-of-the-art results on image recognition without any CNN components, when pretrained on large datasets.",
    tags: ["ViT", "Vision Transformers", "Image Classification"],
    discussions: 98, accent: "paper-accent-blue", areaBadge: "badge-blue",
    arxiv: "2010.11929",
  },
  {
    title: "CLIP: Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Radford, Kim, Hallacy et al. — OpenAI",
    venue: "ICML", year: "2021",
    abstract: "Trained on 400M image-text pairs, CLIP learns transferable visual representations and enables powerful zero-shot transfer to downstream vision tasks using natural language prompts.",
    tags: ["Multimodal", "Zero-shot", "Vision-Language"],
    discussions: 87, accent: "paper-accent-cyan", areaBadge: "badge-cyan",
    arxiv: "2103.00020",
  },
  {
    title: "Training Language Models to Follow Instructions with Human Feedback",
    authors: "Ouyang, Wu, Jiang et al. — OpenAI",
    venue: "NeurIPS", year: "2022",
    abstract: "InstructGPT aligns language models through RLHF. Despite having 100x fewer parameters, InstructGPT outputs are preferred by humans over GPT-3. This paper defined the RLHF paradigm for AI alignment.",
    tags: ["RLHF", "Alignment", "Instruction Tuning", "GPT"],
    discussions: 113, accent: "paper-accent-green", areaBadge: "badge-green",
    arxiv: "2203.02155",
  },
  {
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    authors: "Rombach, Blattmann, Lorenz et al. — LMU Munich",
    venue: "CVPR", year: "2022",
    abstract: "Latent Diffusion Models achieve near-optimal quality-efficiency tradeoff for image synthesis. This is the architecture powering Stable Diffusion. Introduces the key insight of doing diffusion in latent space.",
    tags: ["Diffusion Models", "Stable Diffusion", "Generative"],
    discussions: 76, accent: "paper-accent-rose", areaBadge: "badge-rose",
    arxiv: "2112.10752",
  },
  {
    title: "LLaMA 2: Open Foundation and Fine-Tuned Chat Models",
    authors: "Touvron, Martin, Stone et al. — Meta AI",
    venue: "arXiv", year: "2023",
    abstract: "Meta's open-source LLM family (7B–70B parameters) fine-tuned for chat. Outperforms many closed models on several benchmarks. Detailed safety analysis and RLHF methodology make this essential reading.",
    tags: ["LLaMA", "Open-Source", "Chat Models", "Fine-tuning"],
    discussions: 134, accent: "paper-accent-amber", areaBadge: "badge-amber",
    arxiv: "2307.09288",
  },
];

// ── Animated Counter ──
function useCountUp(target, duration = 2200, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatItem({ value, suffix, label }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2000, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="stat-number font-bold mb-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ── Paper Card ──
function PaperCard({ paper, index }) {
  return (
    <div
      className={`glass-card hover-lift ${paper.accent} reveal`}
      style={{ transitionDelay: `${index * 80}ms`, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
      data-testid={`paper-card-${index}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span className={`badge ${paper.areaBadge}`} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
          {paper.venue} {paper.year}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12 }}>
          <MessageSquare size={11} /> {paper.discussions} discussions
        </span>
      </div>
      <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#F1F5F9', lineHeight: 1.45, marginBottom: 8, flex: '0 0 auto' }}>
        {paper.title}
      </h3>
      <p style={{ color: '#64748B', fontSize: 12, marginBottom: 8 }}>{paper.authors}</p>
      <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6, marginBottom: 14, flex: 1 }}>
        {paper.abstract}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {paper.tags.map(t => <span key={t} className="tag-pill"><Tag size={9} />{t}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link to="/join" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
          background: 'linear-gradient(135deg, #1A56DB, #7C3AED)', color: 'white', textDecoration: 'none',
        }} data-testid={`paper-discuss-${index}`}>
          Discuss <MessageSquare size={12} />
        </Link>
        <a
          href={`https://arxiv.org/abs/${paper.arxiv}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
        >
          arXiv <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

// ── Video Card ──
function VideoCard({ title, duration, description, colorFrom, colorTo, index }) {
  return (
    <div className="glass-card hover-lift overflow-hidden reveal" style={{ transitionDelay: `${index * 100}ms` }} data-testid={`video-card-${index}`}>
      <div className="video-thumb" style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`, position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-grid-pattern" style={{ opacity: 0.3 }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease',
          boxShadow: '0 0 24px rgba(239,68,68,0.4)',
        }}>
          <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span className="badge badge-blue" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{duration}</span>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#F1F5F9', lineHeight: 1.5, marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{description}</p>
        <a
          href="https://www.youtube.com/@DeepIntellactAI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1A56DB', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
          data-testid={`video-watch-${index}`}
        >
          Watch Now <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

// ── Feature Card ──
function FeatureCard({ icon: Icon, title, description, iconBg, iconColor, delay = 0 }) {
  return (
    <div className="glass-card hover-lift gradient-border reveal" style={{ padding: '1.5rem', transitionDelay: `${delay}ms` }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Icon size={20} color={iconColor} />
      </div>
      <h3 style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7 }}>{description}</p>
    </div>
  );
}

// ── Testimonial ──
function TestimonialCard({ quote, name, role, institution, delay = 0 }) {
  return (
    <div className="glass-card reveal" style={{ padding: '1.5rem', transitionDelay: `${delay}ms` }} data-testid={`testimonial-${name.split(' ')[0].toLowerCase()}`}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#1A56DB" color="#1A56DB" />)}
      </div>
      <p style={{ color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.75, marginBottom: 16, fontStyle: 'italic' }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #1A56DB, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 14,
        }}>{name.charAt(0)}</div>
        <div>
          <div style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 14 }}>{name}</div>
          <div style={{ color: '#94A3B8', fontSize: 12 }}>{role} · {institution}</div>
        </div>
      </div>
    </div>
  );
}

// ── Newsletter ──
function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await axios.post(`${API}/api/newsletter`, { email });
      setStatus('success'); setMsg(res.data.message); setEmail('');
    } catch (err) {
      setStatus('error'); setMsg('Something went wrong. Try again!');
    }
  };

  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }} data-testid="newsletter-section">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,86,219,0.08) 0%, rgba(124,58,237,0.08) 100%)' }} />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div className="section-label reveal" style={{ marginBottom: 16 }}>Stay Updated</div>
        <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: 12 }}>
          Get the <span className="gradient-text">DeepIntellect Weekly Digest</span>
        </h2>
        <p className="reveal delay-200" style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          Paper of the Week recap, top discussions, reading group updates, and research opportunities — every Monday.
        </p>
        {status === 'success' ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', animation: 'fadeInUp 0.6s ease-out forwards' }} data-testid="newsletter-success">
            <Award size={32} color="#34d399" style={{ margin: '0 auto 12px' }} />
            <p style={{ color: '#34d399', fontWeight: 600 }}>{msg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }} className="reveal delay-300" data-testid="newsletter-form">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required className="input-dark" style={{ flex: 1 }}
              data-testid="newsletter-email-input"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-gradient" data-testid="newsletter-submit" style={{ whiteSpace: 'nowrap' }}>
              {status === 'loading' ? 'Subscribing...' : 'Subscribe →'}
            </button>
          </form>
        )}
        {status === 'error' && <p style={{ color: '#fb7185', fontSize: 13, marginTop: 10 }} data-testid="newsletter-error">{msg}</p>}
        <p style={{ color: '#475569', fontSize: 12, marginTop: 14 }}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ── HOME PAGE ──
export default function Home() {
  useReveal();

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="hero-gradient bg-grid-pattern"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}
        data-testid="hero-section"
      >
        <NeuralCanvas />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #0F172A 100%)' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="grid-cols-1 md:grid-cols-2">

            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A56DB', boxShadow: '0 0 12px #1A56DB' }} />
                <span className="section-label">DeepIntellect AI — For Indian CS Researchers</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24 }}>
                Where Indian CS
                <br /><span className="gradient-text">Research Comes Alive</span>
              </h1>

              <p style={{ color: '#94A3B8', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
                The dedicated space for Indian CS researchers to discuss papers, join reading groups, and build the community we always deserved.
                <strong style={{ color: '#CBD5E1' }}> Stop reading papers alone.</strong>
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }} data-testid="hero-ctas">
                <a
                  href="https://www.youtube.com/@DeepIntellactAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient"
                  style={{ fontSize: 15, padding: '12px 24px', gap: 8 }}
                  data-testid="hero-youtube-btn"
                >
                  <Play size={17} fill="white" /> Watch on YouTube
                </a>
                <Link to="/join" className="btn-secondary" style={{ fontSize: 15, padding: '12px 24px' }} data-testid="hero-join-btn">
                  Join the Café <ArrowRight size={17} />
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex' }}>
                  {['A','P','R','S','K'].map((l, i) => (
                    <div key={i} style={{
                      width: 30, height: 30, borderRadius: '50%', marginLeft: i === 0 ? 0 : -8,
                      background: `linear-gradient(135deg, ${i % 2 === 0 ? '#1A56DB' : '#7C3AED'}, ${i % 2 === 0 ? '#7C3AED' : '#1A56DB'})`,
                      border: '2px solid #0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'white', zIndex: 5 - i,
                    }}>{l}</div>
                  ))}
                </div>
                <p style={{ color: '#94A3B8', fontSize: 14 }}>
                  Join <span style={{ color: 'white', fontWeight: 700 }}>2,000+</span> Indian researchers already inside
                </p>
              </div>
            </div>

            {/* Right — Platform Preview */}
            <div className="hidden md:block" style={{ position: 'relative' }}>
              <div className="preview-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <FileText size={15} color="#1A56DB" />
                  <span style={{ color: '#94A3B8', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>Paper of the Week</span>
                  <span className="badge badge-violet" style={{ marginLeft: 'auto', fontSize: 10 }}>Live Discussion</span>
                </div>
                <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#F1F5F9', fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>
                  Attention Is All You Need
                </h4>
                <p style={{ color: '#64748B', fontSize: 11, marginBottom: 12 }}>Vaswani et al. · NeurIPS 2017</p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                  {['Transformers', 'Attention', 'NLP'].map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { user: 'A', name: 'Arjun S.', msg: 'The multi-head attention mechanism is what makes this special. Each head learns different relationships...', time: '2m ago' },
                    { user: 'P', name: 'Priya N.', msg: 'Can someone explain positional encoding intuitively? The sine/cosine formulation is elegant but...', time: '8m ago' },
                    { user: 'R', name: 'Rohan M.', msg: 'Implemented this from scratch in PyTorch. Happy to share the Colab notebook.', time: '15m ago' },
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #1A56DB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>{c.user}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ color: '#CBD5E1', fontSize: 11, fontWeight: 600 }}>{c.name}</span>
                          <span style={{ color: '#475569', fontSize: 10 }}>{c.time}</span>
                        </div>
                        <p style={{ color: '#94A3B8', fontSize: 11, lineHeight: 1.5 }}>{c.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#475569', fontSize: 11 }}>142 researchers discussing</span>
                  <Link to="/join" style={{ color: '#1A56DB', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>Join thread →</Link>
                </div>
              </div>
              {/* Floating badges */}
              <div style={{ position: 'absolute', top: -20, right: -20, background: 'rgba(26,86,219,0.15)', border: '1px solid rgba(26,86,219,0.3)', borderRadius: 8, padding: '6px 12px', backdropFilter: 'blur(10px)' }}>
                <span style={{ color: '#60a5fa', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>16+ Rooms Active</span>
              </div>
              <div style={{ position: 'absolute', bottom: -16, left: -16, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 8, padding: '6px 12px', backdropFilter: 'blur(10px)' }}>
                <span style={{ color: '#a78bfa', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>4 Reading Groups Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,16,32,0.8)' }} data-testid="stats-section">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <StatItem value={2000} suffix="+" label="Researchers" />
            <StatItem value={50} suffix="+" label="Paper Discussions" />
            <StatItem value={12} suffix="+" label="Reading Groups" />
            <StatItem value={100} suffix="%" label="Dedicated Guidance" />
          </div>
        </div>
      </section>



      {/* ── WHAT WE DO ── */}
      <section style={{ padding: '6rem 0' }} data-testid="what-we-do-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>What We Do</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 14 }}>
              Stop Reading Papers <span className="gradient-text">Alone</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
              Every paper. Every week. Every discussion. Built for the Indian research ecosystem.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <FeatureCard icon={BookOpen} title="Paper Walkthroughs" description="We break down cutting-edge AI/ML papers into clear, actionable insights. No jargon without explanation. From fundamentals to frontier — we cover it all." iconBg="rgba(26,86,219,0.12)" iconColor="#60a5fa" delay={0} />
            <FeatureCard icon={Users} title="Research Community" description="Connect with Indian CS researchers who get your context — IIT/NIT life, compute constraints, advisor dynamics. Find your research tribe." iconBg="rgba(124,58,237,0.12)" iconColor="#a78bfa" delay={120} />
            <FeatureCard icon={Rss} title="Paper of the Week" description="Every Monday, the most impactful paper opens for community discussion. Structured template, expert moderation, community nominations." iconBg="rgba(16,185,129,0.12)" iconColor="#34d399" delay={240} />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TOP PAPERS ── */}
      <section style={{ padding: '6rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="papers-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <div className="section-label reveal" style={{ marginBottom: 12 }}>Top Papers</div>
              <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', fontWeight: 800, color: 'white' }}>
                Papers Every Indian Researcher <span className="gradient-text">Must Know</span>
              </h2>
            </div>
            <Link to="/community" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1A56DB', fontSize: 14, fontWeight: 600, textDecoration: 'none' }} data-testid="view-all-papers">
              View All Discussions <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {topPapers.map((paper, i) => <PaperCard key={paper.arxiv} paper={paper} index={i} />)}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── LATEST VIDEOS ── */}
      <section style={{ padding: '6rem 0' }} data-testid="videos-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <div className="section-label reveal" style={{ marginBottom: 12 }}>Latest Content</div>
              <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', fontWeight: 800, color: 'white' }}>
                Recent <span className="gradient-text">Paper Walkthroughs</span>
              </h2>
            </div>
            <a href="https://www.youtube.com/@DeepIntellactAI" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1A56DB', fontSize: 14, fontWeight: 600, textDecoration: 'none' }} data-testid="view-all-videos">
              View all on YouTube <ChevronRight size={16} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <VideoCard index={0} title="Attention Is All You Need — Complete Deep Dive" duration="28:45" description="Every detail of multi-head attention, positional encodings, and why this 2017 paper still powers every LLM you use today." colorFrom="rgba(26,86,219,0.4)" colorTo="#0F172A" />
            <VideoCard index={1} title="LLaMA 2: What Changed and Why It Matters" duration="35:12" description="Meta's open-source breakthrough. Architecture changes, training details, RLHF methodology, and implications for fine-tuning on Indian languages." colorFrom="rgba(124,58,237,0.4)" colorTo="#0F172A" />
            <VideoCard index={2} title="Segment Anything Model (SAM) — Full Walkthrough" duration="42:08" description="Meta's foundational vision model. Promptable segmentation, dataset curation, and every ablation study that validates the design choices." colorFrom="rgba(6,182,212,0.35)" colorTo="#0F172A" />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PAPER OF THE WEEK ── */}
      <section style={{ padding: '6rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="potw-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="reveal">
              <div className="section-label" style={{ marginBottom: 14 }}>This Week</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
                Paper of the <span className="gradient-text">Week</span>
              </h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                Every Monday, we pick one high-impact paper and open it for structured community discussion. Community nominations open every Thursday — anyone can submit.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 13 }}>
                  <Calendar size={14} color="#1A56DB" /> Posted every Monday
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 13 }}>
                  <Users size={14} color="#7C3AED" /> Community discussions
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 13 }}>
                  <Bell size={14} color="#34d399" /> Nomination Thursdays
                </div>
              </div>
            </div>
            <div className="reveal delay-200">
              <div style={{ border: '1px solid rgba(124,58,237,0.3)', borderRadius: 16, background: 'rgba(124,58,237,0.05)', padding: '2rem', boxShadow: '0 0 40px rgba(124,58,237,0.1)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span className="badge badge-violet">Paper of the Week</span>
                  <span className="badge badge-blue" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>NeurIPS 2017</span>
                </div>
                <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700, color: '#F1F5F9', marginBottom: 8, lineHeight: 1.4 }}>
                  Attention Is All You Need
                </h3>
                <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Vaswani, Shazeer, Parmar, Uszkoreit et al. — Google Brain</p>
                <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                  We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                  {['Transformers', 'Attention', 'NLP', 'Foundational'].map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>
                <Link to="/join" className="btn-gradient" style={{ fontSize: 14 }} data-testid="paper-join-discussion">
                  Join Discussion <MessageSquare size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── COMMUNITY FEATURES ── */}
      <section style={{ padding: '6rem 0' }} data-testid="community-features-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>The Platform</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 14 }}>
              The Research Community <span className="gradient-text">India Needed</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <FeatureCard icon={MessageSquare} title="Discussion Rooms" description="16 topic rooms for CV, NLP, LLMs, RL, and every major research area. Moderated, on-topic, and active." iconBg="rgba(26,86,219,0.12)" iconColor="#60a5fa" delay={0} />
            <FeatureCard icon={BookMarked} title="Reading Groups" description="Async and live groups. Weekly paper clubs, bi-weekly deep dives. Find your people and read together." iconBg="rgba(124,58,237,0.12)" iconColor="#a78bfa" delay={100} />
            <FeatureCard icon={Globe} title="Research Noticeboard" description="PhD positions, fellowships, conference deadlines, collaboration requests — all in one place." iconBg="rgba(16,185,129,0.12)" iconColor="#34d399" delay={200} />
            <FeatureCard icon={Library} title="Resources Library" description="Community-curated survey papers, tutorials, code, datasets, and career guides. Upvote-ranked." iconBg="rgba(244,63,94,0.12)" iconColor="#fb7185" delay={300} />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '6rem 0', background: 'rgba(8,14,28,0.6)' }} data-testid="testimonials-section">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 14 }}>Community Voices</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white' }}>
              What Researchers Are <span className="gradient-text">Saying</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <TestimonialCard
              quote="Finally, a place where I can discuss papers with people who actually understand the Indian PhD experience. The reading groups are invaluable for my thesis work on Vision-Language Models."
              name="Arjun Sharma" role="3rd Year PhD" institution="IIT Bombay" delay={0}
            />
            <TestimonialCard
              quote="As a BTech student trying to break into research, DeepIntellect AI's paper walkthroughs gave me the confidence to read and critique papers on my own. Game-changer."
              name="Priya Nair" role="Final Year BTech" institution="NIT Trichy" delay={150}
            />
            <TestimonialCard
              quote="The community bridges the gap between reading papers and implementing them. Sharing Colab notebooks and getting feedback from fellow builders has been incredible."
              name="Rohan Mehta" role="ML Engineer" institution="Bangalore Startup" delay={300}
            />
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <Newsletter />

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }} data-testid="bottom-cta-section">
        <div className="section-label reveal" style={{ marginBottom: 14 }}>Ready to Join?</div>
        <h2 className="reveal delay-100" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
          The Community is Live.<br /><span className="gradient-text">Don't Sit This Out.</span>
        </h2>
        <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          2,000+ Indian CS researchers are already inside discussing papers, joining reading groups, and building careers together.
        </p>
        <div className="reveal delay-300" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          <Link to="/join" className="btn-gradient" style={{ fontSize: 16, padding: '14px 28px' }} data-testid="bottom-join-cta">
            Join the Café — It's Free <ArrowRight size={18} />
          </Link>
          <a href="https://www.youtube.com/@DeepIntellactAI" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: 16, padding: '14px 28px' }} data-testid="bottom-youtube-cta">
            <Play size={18} /> Watch YouTube
          </a>
        </div>
        <div className="reveal delay-400" style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
          {['Free forever', 'No credit card', '2,000+ researchers'].map(item => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13 }}>
              <Zap size={13} color="#1A56DB" /> {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
