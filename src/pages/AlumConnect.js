import React, { useState, useEffect } from 'react';
import {
  GraduationCap, Award, Briefcase, Calendar, CheckCircle2,
  Send, Video, ShieldCheck, Flame, ArrowRight, Clock, Check, Loader2
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useReveal from '../hooks/useReveal';

const speakers = [
  {
    id: 'thansen',
    name: 'Thansen Dhrit Lahare',
    role: 'Member of Technical Staff (MTS)',
    company: 'Oracle',
    color: '#3B82F6',
    image: 'https://customer-assets.emergentagent.com/job_1c1217d3-60c8-4e1f-a67a-586a12ae3b7f/artifacts/wokkg6ut_thansen.jpeg',
    education: 'M.Tech CS (AI) — IIT BHU | TPR 2024-26',
    interviewsCleared: ['Oracle (MTS)', 'Nokia', 'Arista Networks', 'Wipro'],
    bio: 'Member of Technical Staff at Oracle. Training & Placement Representative (TPR) for 2024-26 batch at IIT BHU. Interviewed and cleared selection rounds at Oracle, Nokia, Arista Networks, and Wipro.',
  },
  {
    id: 'navneet',
    name: 'Navneet Panchayan',
    role: 'Senior Software Engineer 1',
    company: 'HCLSoftware',
    color: '#8B5CF6',
    image: 'https://customer-assets.emergentagent.com/job_1c1217d3-60c8-4e1f-a67a-586a12ae3b7f/artifacts/k261rtfv_navneet.jfif',
    education: 'M.Tech CS (AI) — IIT BHU',
    interviewsCleared: ['Oracle', 'Samsung Bglr', 'Walmart', 'HCLSoftware'],
    bio: 'Senior Software Engineer 1 at HCLSoftware working on ML models & GenAI tech. Interviewed at Oracle, Samsung Bglr, Walmart, and HCLSoftware.',
  },
  {
    id: 'tanushree',
    name: 'Tanushree',
    role: 'Software Engineer',
    company: 'Samsung Noida',
    color: '#06B6D4',
    image: '/images/tanushree.jpg',
    education: 'M.Tech CS (IoT) — IIT BHU | TPV 2024-26',
    interviewsCleared: ['Oracle', 'Samsung Noida', 'Walmart'],
    bio: 'Software Engineer at Samsung Noida. Training & Placement Volunteer (TPV) for 2024-26 batch at IIT BHU. Interviewed at Oracle, Samsung Noida, and Walmart.',
  },
  {
    id: 'adarsh',
    name: 'Adarsh Hondadakatti',
    role: 'Software Engineer',
    company: 'Nitor Infotech',
    color: '#10B981',
    image: '/images/adarsh.jpg',
    education: 'M.Tech CS (AI) — IIT BHU | Ex-Intern @ Netskope',
    interviewsCleared: ['Nitor Infotech', 'Netskope'],
    bio: 'Software Engineer in the Machine Learning domain at Nitor Infotech, with prior internship experience at cloud security leader Netskope.',
  },
  {
    id: 'naman',
    name: 'Naman Tanwar',
    role: 'Software Engineer',
    company: 'Baya Systems',
    color: '#EC4899',
    image: '/images/naman.jpg',
    education: 'M.Tech CS (IoT) — IIT BHU | TPR 2023-25',
    interviewsCleared: ['Baya Systems'],
    bio: 'Software Engineer at Baya Systems and former Training & Placement Representative (TPR 2023-25) for M.Tech CS at IIT BHU.',
  },
  {
    id: 'sreyashi',
    name: 'Sreyashi Saha',
    role: 'Software Engineer (SWE)',
    company: 'Microsoft',
    color: '#F59E0B',
    image: '/images/sreyashi.jpg',
    education: 'M.Tech CS (AI) — IIT BHU | TPV 2023-25',
    interviewsCleared: ['Microsoft'],
    bio: 'Software Engineer at Microsoft and former Training & Placement Volunteer (TPV 2023-25) at IIT BHU.',
  }
];

export default function AlumConnect() {
  useReveal();

  useEffect(() => {
    document.title = "Alum Connect | IIT BHU Postgrad Mentorship";
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cohort: 'Placement Guidance Cohort (M.Tech CS 2nd Year)',
    branch: 'M.Tech CS (AI)',
    questions: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'alum_connect_registrations'), {
        ...formData,
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString(),
        source: 'alum_connect_page'
      });
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error("Error saving to Firebase: ", err);
      try {
        const existing = JSON.parse(localStorage.getItem('di_alum_registrations') || '[]');
        existing.push({ ...formData, createdAt: new Date().toISOString() });
        localStorage.setItem('di_alum_registrations', JSON.stringify(existing));
        setSubmitted(true);
      } catch (localErr) {
        setErrorMsg('Failed to submit form. Please check network connection and try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 64, background: '#0F172A', minHeight: '100vh', color: '#F1F5F9' }}>
      
      {/* SEO Dynamic Metadata Elements */}
      <div className="sr-only">
        <h1>IIT BHU M.Tech CS Alum Connect - Placement & Internship Guidance</h1>
        <p>Direct mentorship from IIT BHU postgrads working at Microsoft, Oracle, HCLSoftware, Baya Systems, and Nitor Infotech.</p>
      </div>

      {/* HERO SECTION */}
      <section style={{ position: 'relative', padding: 'clamp(3rem, 6vw, 5rem) 0 3rem', overflow: 'hidden' }}>
        {/* Background glow & Grid pattern */}
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(26,86,219,0.15) 50%, transparent 80%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
          
          <div style={{ textAlign: 'center', maxWidth: 850, margin: '0 auto' }}>
            <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)', marginBottom: 20 }}>
              <Flame size={16} color="#A78BFA" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#DDD6FE', letterSpacing: '0.04em' }}>
                IIT BHU Postgrad Mentorship Initiative
              </span>
            </div>

            <h1 className="reveal delay-100" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Crack Your Placement & Internship Season with <br className="hidden md:block" />
              <span className="gradient-text">IIT BHU Alum Connect</span>
            </h1>

            <p className="reveal delay-200" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: '#94A3B8', lineHeight: 1.7, marginBottom: 32, maxWidth: 740, margin: '0 auto 32px' }}>
              Learn directly from IIT BHU M.Tech CS postgrads who navigated campus drives, cleared top-tier tech interviews (Microsoft, Oracle, HCLSoftware, Baya Systems, Nitor Infotech), and are helping juniors succeed.
            </p>

            {/* Quick Cohort Badges */}
            <div className="reveal delay-300" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '10px 18px', borderRadius: 12, backdropFilter: 'blur(10px)' }}>
                <Video size={18} color="#60A5FA" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Live Sessions</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>Google Meet Cohorts</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '10px 18px', borderRadius: 12, backdropFilter: 'blur(10px)' }}>
                <Calendar size={18} color="#F472B6" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Cohort Schedule</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>Announcing Dates Soon!</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '10px 18px', borderRadius: 12, backdropFilter: 'blur(10px)' }}>
                <ShieldCheck size={18} color="#34D399" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Session Type</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>Senior-Junior Guidance</div>
                </div>
              </div>
            </div>

            <a href="#register-form" className="btn-gradient reveal delay-400" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              Register for Guidance Cohort <ArrowRight size={18} />
            </a>

          </div>

        </div>
      </section>

      <div className="divider" />

      {/* COHORTS ANNOUNCEMENT CARDS */}
      <section style={{ padding: '4rem 0', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 12 }}>Guidance Streams</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800 }}>
              Tailored Guidance <span className="gradient-text">Cohorts</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 15, marginTop: 8 }}>
              Dedicated guidance streams tailored for M.Tech CS 2nd Year & 1st Year milestones.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* Placement Cohort Card */}
            <div className="glass-card hover-lift reveal" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.8) 100%)', borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                  <Briefcase size={22} color="#60A5FA" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: 'rgba(59, 130, 246, 0.15)', color: '#93C5FD', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  For M.Tech CS 2nd Year
                </span>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', marginBottom: 10 }}>
                Placement Guidance Cohort
              </h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Targeted for <strong>M.Tech CS 2nd year students</strong> gearing up for upcoming campus placement drives.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  'Resume Shortlisting & Portfolio Reviews',
                  'Technical Interview Cracking Strategy (DSA, ML & Systems)',
                  'Insider Insights from Official Placement Reps (TPR & Volunteers)',
                  'Company-Specific Prep (Microsoft, Oracle, HCLSoftware, Walmart, etc.)'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#CBD5E1' }}>
                    <CheckCircle2 size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 10, border: '1px dashed rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock size={16} color="#60A5FA" />
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Live Google Meet: <strong style={{ color: '#F1F5F9' }}>Announcing Dates Soon!</strong></span>
              </div>
            </div>

            {/* Intern Cohort Card */}
            <div className="glass-card hover-lift reveal delay-150" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(135deg, rgba(88,28,135,0.25) 0%, rgba(15,23,42,0.8) 100%)', borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                  <GraduationCap size={22} color="#C084FC" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: 'rgba(139, 92, 246, 0.15)', color: '#C084FC', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  For M.Tech CS 1st Year
                </span>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', marginBottom: 10 }}>
                Intern Guidance Cohort
              </h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Designed for <strong>M.Tech CS 1st year students</strong> aiming for top summer tech internships.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  'Early Resume Building Strategy',
                  'On-Campus & Off-Campus Internship Preparation',
                  'Coding Round Preparation Roadmap (LeetCode & Core CS)'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#CBD5E1' }}>
                    <CheckCircle2 size={16} color="#C084FC" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 10, border: '1px dashed rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock size={16} color="#C084FC" />
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Live Google Meet: <strong style={{ color: '#F1F5F9' }}>Announcing Dates Soon!</strong></span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      {/* MEET OUR 5 FEATURED SPEAKERS & MENTORS */}
      <section style={{ padding: '4rem 0', background: 'rgba(8, 14, 28, 0.6)', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label reveal" style={{ marginBottom: 12 }}>IIT BHU Postgrads</div>
            <h2 className="reveal delay-100" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900 }}>
              Meet Your <span className="gradient-text">Mentors & Speakers</span>
            </h2>
            <p className="reveal delay-200" style={{ color: '#94A3B8', fontSize: 15, maxWidth: 650, margin: '10px auto 0' }}>
              IIT BHU postgrads working across industry leaders like Microsoft, Oracle, HCLSoftware, Baya Systems, and Nitor Infotech.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {speakers.map((s, index) => (
              <div
                key={s.id}
                className="glass-card hover-lift reveal"
                style={{
                  padding: '1.75rem',
                  borderRadius: 18,
                  position: 'relative',
                  border: `1px solid ${s.color}30`,
                  background: 'rgba(15, 23, 42, 0.75)',
                  transitionDelay: `${index * 80}ms`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: 16, overflow: 'hidden', flexShrink: 0,
                    border: `2px solid ${s.color}`, boxShadow: `0 0 16px ${s.color}30`
                  }}>
                    <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#F8FAFC', marginBottom: 2 }}>{s.name}</h3>
                    <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.role}</div>
                    <div style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 600 }}>@ {s.company}</div>
                  </div>
                </div>

                {/* Education */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#94A3B8', marginBottom: 14, background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: 8 }}>
                  <GraduationCap size={14} color="#94A3B8" />
                  <span>{s.education}</span>
                </div>

                {/* Bio */}
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                  {s.bio}
                </p>

                {/* Interviews Cleared / Experienced */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Award size={13} color={s.color} />
                    <span>Companies Interviewed:</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.interviewsCleared.map((company, cIdx) => (
                      <span key={cIdx} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* REGISTRATION FORM SECTION (CONNECTED TO FIREBASE) */}
      <section id="register-form" style={{ padding: '4rem 0', position: 'relative' }}>
        <div style={{ maxWidth: 750, margin: '0 auto', padding: '0 1rem' }}>
          
          <div className="glass-card reveal" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: 20, border: '1px solid rgba(124, 58, 237, 0.3)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            
            {!submitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div className="section-label" style={{ marginBottom: 10 }}>Register Now</div>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#F8FAFC' }}>
                    Join the <span className="gradient-text">Mentorship Sessions</span>
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: 14, marginTop: 6 }}>
                    Submit your details below to receive Google Meet session links & schedule.
                  </p>
                </div>

                {errorMsg && (
                  <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 10, color: '#FCA5A5', fontSize: 13, marginBottom: 20 }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                        Full Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 10,
                          background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F8FAFC', fontSize: 14, outline: 'none'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                        Email Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your.email@iitbhu.ac.in"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 10,
                          background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F8FAFC', fontSize: 14, outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    {/* Contact Phone */}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                        WhatsApp / Contact Number <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 10,
                          background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F8FAFC', fontSize: 14, outline: 'none'
                        }}
                      />
                    </div>

                    {/* Branch / Program Dropdown: ONLY M.Tech CS (AI) and M.Tech CS (IoT) */}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                        Branch / Program <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 10,
                          background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F8FAFC', fontSize: 14, outline: 'none'
                        }}
                      >
                        <option value="M.Tech CS (AI)">M.Tech CS (AI)</option>
                        <option value="M.Tech CS (IoT)">M.Tech CS (IoT)</option>
                      </select>
                    </div>
                  </div>

                  {/* Guidance Preference: ONLY Placement Guidance Cohort or Intern Guidance Cohort */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 8 }}>
                      Interested Guidance Cohort <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                      {[
                        { label: 'Placement Guidance Cohort (M.Tech CS 2nd Year)', value: 'Placement Guidance Cohort (M.Tech CS 2nd Year)' },
                        { label: 'Intern Guidance Cohort (M.Tech CS 1st Year)', value: 'Intern Guidance Cohort (M.Tech CS 1st Year)' }
                      ].map((cohortOption) => (
                        <label
                          key={cohortOption.value}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10,
                            background: formData.cohort === cohortOption.value ? 'rgba(124, 58, 237, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                            border: formData.cohort === cohortOption.value ? '1px solid rgba(124, 58, 237, 0.6)' : '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer', transition: 'all 0.2s'
                          }}
                        >
                          <input
                            type="radio"
                            name="cohort"
                            value={cohortOption.value}
                            checked={formData.cohort === cohortOption.value}
                            onChange={handleChange}
                            style={{ accentColor: '#8B5CF6' }}
                          />
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>{cohortOption.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Questions */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                      Specific Questions for Mentors (Optional)
                    </label>
                    <textarea
                      name="questions"
                      rows={3}
                      placeholder="Ask anything regarding preparation, resume tips, or TPR advice..."
                      value={formData.questions}
                      onChange={handleChange}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.12)',
                        color: '#F8FAFC', fontSize: 14, outline: 'none', resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient"
                    style={{
                      marginTop: 6, padding: '14px 24px', fontSize: 15, fontWeight: 700, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Register for Cohort Sessions <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: 9999, background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Check size={30} color="#10B981" />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 10 }}>
                  Registration Confirmed! 🎉
                </h3>
                <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 20px' }}>
                  Thank you, <strong style={{ color: '#F1F5F9' }}>{formData.fullName}</strong> ({formData.branch}). Your registration for the <strong style={{ color: '#A78BFA' }}>{formData.cohort}</strong> has been saved.
                </p>
                <div>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94A3B8', padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
                  >
                    Register Another Student
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
