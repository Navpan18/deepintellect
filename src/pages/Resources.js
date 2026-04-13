import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Plus, Tag, Star, TrendingUp, Filter } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const categories = ['All', 'Survey Papers', 'Tutorials', 'Code & Implementations', 'Datasets', 'Courses', 'Career Resources'];

const resources = [
  {
    category: 'Survey Papers',
    title: 'A Survey of Large Language Models',
    description: 'Comprehensive survey covering LLM pretraining, fine-tuning, alignment, and evaluation. 100+ pages covering the full landscape of modern LLMs. Essential for anyone working in NLP or LLMs.',
    tags: ['LLMs', 'NLP', 'Survey', '200+ citations'],
    difficulty: 'Intermediate',
    upvotes: 284,
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.12)',
    accent: 'paper-accent-violet',
    url: 'https://arxiv.org/abs/2303.18223',
  },
  {
    category: 'Tutorials',
    title: 'The Illustrated Transformer — Jay Alammar',
    description: 'The best visual walkthrough of the Transformer architecture on the internet. Covers attention mechanisms, positional encodings, and encoder-decoder structure with beautiful diagrams.',
    tags: ['Transformers', 'Attention', 'Visual', 'Beginner-Friendly'],
    difficulty: 'Beginner',
    upvotes: 412,
    color: '#60a5fa',
    bg: 'rgba(26,86,219,0.12)',
    accent: 'paper-accent-blue',
    url: 'https://jalammar.github.io/illustrated-transformer/',
  },
  {
    category: 'Code & Implementations',
    title: 'nanoGPT — Minimal GPT Implementation by Karpathy',
    description: "Andrej Karpathy's minimal, readable GPT implementation in PyTorch (~300 lines). Perfect for understanding GPT internals from first principles. The best way to learn by implementing.",
    tags: ['GPT', 'PyTorch', 'Minimal', 'Educational'],
    difficulty: 'Advanced',
    upvotes: 356,
    color: '#34d399',
    bg: 'rgba(16,185,129,0.12)',
    accent: 'paper-accent-green',
    url: 'https://github.com/karpathy/nanoGPT',
  },
  {
    category: 'Datasets',
    title: 'AI4Bharat: Indian Language NLP Datasets Collection',
    description: 'Curated collection of NLP datasets for 22 Indian languages. Includes Indic-GLUE benchmark, IndicNLP, Samanantar (parallel corpus), and more. Essential for multilingual AI research.',
    tags: ['India', 'NLP', 'Multilingual', 'Indic Languages'],
    difficulty: 'Intermediate',
    upvotes: 178,
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.12)',
    accent: 'paper-accent-amber',
    url: 'https://ai4bharat.org',
  },
  {
    category: 'Courses',
    title: 'CS224N: NLP with Deep Learning — Stanford University',
    description: "Stanford's flagship NLP course. Full lecture videos, slides, and assignments covering modern NLP: RNNs, Transformers, BERT, GPT, instruction tuning, and state-of-the-art language models.",
    tags: ['Course', 'NLP', 'Stanford', 'Free', 'Full Curriculum'],
    difficulty: 'Intermediate',
    upvotes: 521,
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.12)',
    accent: 'paper-accent-cyan',
    url: 'https://web.stanford.edu/class/cs224n/',
  },
  {
    category: 'Career Resources',
    title: 'The Indian PhD Application Guide (Community-Written)',
    description: "Community-written guide covering the full Indian PhD application process: shortlisting supervisors at IITs/IISc, writing SOP, interview preparation, stipend negotiation, and life after joining.",
    tags: ['PhD', 'Career', 'India', 'Applications', 'IIT'],
    difficulty: 'All Levels',
    upvotes: 243,
    color: '#fb7185',
    bg: 'rgba(244,63,94,0.12)',
    accent: 'paper-accent-rose',
    url: '#',
  },
  {
    category: 'Survey Papers',
    title: 'A Survey on Diffusion Models: Theory and Applications',
    description: 'Comprehensive survey covering DDPM, DDIM, score-based models, latent diffusion, and applications across image, audio, and video generation. Great starting point for diffusion model research.',
    tags: ['Diffusion', 'Generative Models', 'Survey', 'Image Generation'],
    difficulty: 'Intermediate',
    upvotes: 196,
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.12)',
    accent: 'paper-accent-violet',
    url: 'https://arxiv.org/abs/2209.00796',
  },
  {
    category: 'Tutorials',
    title: 'Hugging Face NLP Course — Free & Comprehensive',
    description: 'Official Hugging Face course covering transformers library, fine-tuning, datasets, tokenization, and deployment. Hands-on notebooks included. Best practical NLP tutorial available.',
    tags: ['HuggingFace', 'Fine-tuning', 'Practical', 'Free'],
    difficulty: 'Beginner',
    upvotes: 389,
    color: '#60a5fa',
    bg: 'rgba(26,86,219,0.12)',
    accent: 'paper-accent-blue',
    url: 'https://huggingface.co/learn/nlp-course',
  },
  {
    category: 'Code & Implementations',
    title: 'Annotated Deep Learning Papers (paperswithcode)',
    description: 'Annotated implementations of influential deep learning papers with inline explanations. Papers range from ResNet to DDPM. Perfect for researchers who learn by reading annotated code.',
    tags: ['Annotated', 'Papers', 'Implementation', 'Learning'],
    difficulty: 'Advanced',
    upvotes: 267,
    color: '#34d399',
    bg: 'rgba(16,185,129,0.12)',
    accent: 'paper-accent-green',
    url: 'https://nn.labml.ai',
  },
  {
    category: 'Datasets',
    title: 'Common Crawl + C4 Dataset Documentation',
    description: 'Detailed documentation of the Common Crawl and C4 datasets used in pretraining modern LLMs. Covers filtering methodology, deduplication, and how to access the dataset on GCP.',
    tags: ['Pretraining', 'Dataset', 'LLMs', 'Web Data'],
    difficulty: 'Advanced',
    upvotes: 112,
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.12)',
    accent: 'paper-accent-amber',
    url: '#',
  },
  {
    category: 'Courses',
    title: 'Fast.ai: Practical Deep Learning for Coders',
    description: "Jeremy Howard's top-down approach to deep learning. Starts with working code and goes deep. Covers CNNs, NLP, tabular data, and diffusion models. Free forever.",
    tags: ['Deep Learning', 'Practical', 'Top-Down', 'Free'],
    difficulty: 'Beginner',
    upvotes: 478,
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.12)',
    accent: 'paper-accent-cyan',
    url: 'https://course.fast.ai',
  },
  {
    category: 'Career Resources',
    title: 'How to Read a CS Research Paper — Keshav (2007)',
    description: 'The classic three-pass method for reading research papers efficiently. A must-read for every researcher starting their journey. 1000+ citations, still the gold standard advice.',
    tags: ['Reading Papers', 'Research Skills', 'Classic', 'Essential'],
    difficulty: 'All Levels',
    upvotes: 331,
    color: '#fb7185',
    bg: 'rgba(244,63,94,0.12)',
    accent: 'paper-accent-rose',
    url: '#',
  },
];

const difficultyColors = {
  'Beginner': { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
  'Intermediate': { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  'Advanced': { color: '#fb7185', bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.2)' },
  'All Levels': { color: '#60a5fa', bg: 'rgba(26,86,219,0.1)', border: 'rgba(26,86,219,0.2)' },
};

function ResourceCard({ resource, index }) {
  const dc = difficultyColors[resource.difficulty];
  return (
    <div
      className={`glass-card hover-lift ${resource.accent} reveal`}
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', transitionDelay: `${index * 60}ms` }}
      data-testid={`resource-card-${index}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ background: resource.bg, border: `1px solid ${resource.color}25`, color: resource.color, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
          {resource.category}
        </span>
        <span style={{ background: dc.bg, border: `1px solid ${dc.border}`, color: dc.color, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 500 }}>
          {resource.difficulty}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12 }}>
          <TrendingUp size={11} /> {resource.upvotes}
        </div>
      </div>

      <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#F1F5F9', lineHeight: 1.45, marginBottom: 8, flex: '0 0 auto' }}>
        {resource.title}
      </h3>
      <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
        {resource.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
        {resource.tags.map(t => <span key={t} className="tag-pill"><Tag size={9} />{t}</span>)}
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1A56DB', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
        data-testid={`resource-view-${index}`}
      >
        View Resource <ExternalLink size={13} />
      </a>
    </div>
  );
}

export default function Resources() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? resources : resources.filter(r => r.category === activeCategory);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }} data-testid="resources-hero">
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 500, height: 400, background: 'radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
            <div>
              <div className="section-label reveal" style={{ marginBottom: 14 }}>Resources</div>
              <h1 className="reveal delay-100" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 14 }}>
                Free Resources for <span className="gradient-text">CS Researchers</span>
              </h1>
              <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, maxWidth: 560 }}>
                Community-curated survey papers, tutorials, code, datasets, courses, and career resources. All free. Upvote-ranked. Always growing.
              </p>
            </div>
            <div className="reveal delay-300" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', minWidth: 70 }}>
                <div className="stat-number" style={{ fontSize: 28, fontWeight: 800 }}>{resources.length}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Resources</div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 70 }}>
                <div className="stat-number" style={{ fontSize: 28, fontWeight: 800 }}>6</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Categories</div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 70 }}>
                <div className="stat-number" style={{ fontSize: 28, fontWeight: 800 }}>100%</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(8,14,28,0.9)', position: 'sticky', top: 64, zIndex: 30 }} data-testid="category-filter">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 0', overflowX: 'auto' }} className="scrollbar-hide">
            <Filter size={14} color="#64748B" style={{ flexShrink: 0, marginRight: 4 }} />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0, padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  background: activeCategory === cat ? 'linear-gradient(135deg, #1A56DB, #7C3AED)' : 'transparent',
                  color: activeCategory === cat ? 'white' : '#94A3B8',
                  border: activeCategory === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s ease',
                }}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat} {activeCategory === cat && filtered.length > 0 && `(${filtered.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESOURCE CARDS ── */}
      <section style={{ padding: '3rem 0 5rem' }} data-testid="resources-grid">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 8 }}>
            <p style={{ color: '#94A3B8', fontSize: 14 }}>
              Showing <span style={{ color: 'white', fontWeight: 600 }}>{filtered.length}</span> resources
              {activeCategory !== 'All' && <span> in <span style={{ color: '#60a5fa' }}>{activeCategory}</span></span>}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: 13 }}>
              <Star size={12} color="#fbbf24" /> Upvote-ranked by community
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filtered.map((resource, i) => <ResourceCard key={resource.title} resource={resource} index={i} />)}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SUBMIT CTA ── */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }} data-testid="submit-resource-section">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="glass-card reveal" style={{ padding: '3rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, rgba(26,86,219,0.2), rgba(124,58,237,0.2))', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Plus size={24} color="white" />
            </div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'white', marginBottom: 12 }}>
              Know a <span className="gradient-text">Great Resource?</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
              Submit survey papers, tutorials, datasets, tools, or career guides to the community library. If it helped you, it'll help someone else.
            </p>
            <div className="reveal delay-300" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/join" className="btn-gradient" data-testid="submit-resource-cta">
                Submit a Resource <ArrowRight size={15} />
              </Link>
              <Link to="/join" className="btn-secondary" data-testid="resources-join-cta">
                Join to Access All
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
