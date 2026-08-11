import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Send,
  Video,
  ShieldCheck,
  Flame,
  ArrowRight,
  Clock,
  Check,
  Loader2,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import useReveal from "../hooks/useReveal";

const speakers = [
  {
    id: "thansen",
    name: "Thansen Dhrit Lahare",
    role: "Member of Technical Staff (MTS)",
    company: "Oracle",
    color: "#3B82F6",
    image: "/images/thansen_dp.jpeg",
    education: "M.Tech CS (AI) — IIT BHU | TPR 2024-26",
    companiesOfferedRole: [
      "Oracle (MTS)",
      "Nokia",
      "Arista Networks",
      "Wipro",
      "5C Network",
    ],
    bio: "I am a Computer Science and Artificial Intelligence professional, researcher, founder, and educator with an M.Tech in AI from IIT (BHU) Varanasi and a B.Tech in Computer Science Engineering from NIT Raipur. I am the Founder of DeepIntellect AI, focused on building a community connecting students, researchers, alumni, and technology professionals, and the Co-Founder of Vidyakunj Classes, an educational initiative for IIT-JEE aspirants. At IIT (BHU), I served as the Training and Placement Representative for the M.Tech CSE batch, managing placement activities, coordinating with recruiters, and supporting my peers throughout the recruitment process. I secured a Day 0 placement with Oracle and was shortlisted by leading organizations including Microsoft, SAP, Citi, Samsung Electronics, Walmart Global Tech India, Flipkart, Axtria, and Baya Systems Virtusa. Through the off-campus process, I subsequently secured opportunities with Wipro as an AI Engineer, Nokia R&D as an AI Engineer II, Arista Networks as an SDE, and 5C Network as an AI Scientist. My work spans AI/ML, Generative AI, Computer Vision, research, software engineering, entrepreneurship, education, and technical leadership.",
    quote: "“The journey continues, and the best is yet to come.”",
  },
  {
    id: "navneet",
    name: "Navneet Panchayan",
    role: "Senior Software Engineer 1",
    company: "HCLSoftware",
    color: "#8B5CF6",
    image: "/images/navneet.jpg",
    education: "M.Tech CS (AI) — IIT BHU",
    companiesOfferedRole: ["HCLSoftware"],
    bio: "I’m a Senior Software Engineer at HCLSoftware, currently working with the ML team on Unica+. I completed my M.Tech in Computer Science with a specialization in Artificial Intelligence from IIT (BHU) Varanasi in 2026. During my time at IIT (BHU), I also secured multiple opportunities through the placement drive, with more than 13 interview shortlist. I’m also the CTO of DeepIntellect AI, where we aim to build one of India’s strongest AI research communities and foster collaboration among researchers and AI enthusiasts.",
  },
  {
    id: "tanushree",
    name: "Tanushree",
    role: "Software Engineer",
    company: "Samsung Noida",
    color: "#06B6D4",
    image: "/images/tanushree.jpeg",
    education: "M.Tech CS (IoT) — IIT BHU | TPV 2024-26",
    companiesOfferedRole: ["Samsung Noida"],
    bio: "Software Engineer at Samsung Noida. Completed M.Tech CSE in IoT at IIT BHU (2024-26 batch) where she served as a Training & Placement Volunteer (TPV). Cleared selection drives for Samsung Noida, Oracle, and Walmart.",
  },
  {
    id: "chinmoy",
    name: "Chinmoy Kalita",
    role: "Data Analyst",
    company: "Axtria Ingenious Insights",
    color: "#F59E0B",
    image: "/images/chinmoy.jpeg",
    education: "M.Tech Decision Sciences & Engg — IIT BHU | TPR 2024-26",
    companiesOfferedRole: ["Axtria Ingenious Insights"],
    bio: "Chinmoy Kalita is a Data Analyst at Axtria Ingenious Insights, where he joined through campus placements after receiving his second offer among five shortlisted companies. He completed his M.Tech in Decision Sciences and Engineering from IIT (BHU), Varanasi, with a strong focus on Data Science and Analytics. During his master's, he interned at the Australian National University (ANU), Australia, in 2025, working in the field of Data Analytics. He served as the Training and Placement Representative for the 2024–26 batch at IIT (BHU) and was also a Department Postgraduate Committee Member. He was selected among the Top 100 postgraduate students nationwide for the Reliance Foundation Postgraduate Scholarship. Additionally, he represented India at the University of Dundee, Scotland, where his team won the Transforming Lives international competition. His interests lie in data science, analytics, machine learning, and solving real-world problems using data-driven approaches.",
  },
  {
    id: "adarsh",
    name: "Adarsh Hondadakatti",
    role: "Software Engineer",
    company: "Nitor Infotech",
    color: "#10B981",
    image: "/images/adarsh.jpeg",
    education: "M.Tech CS (AI) — IIT BHU | Ex-Intern @ Netskope",
    companiesOfferedRole: ["Nitor Infotech", "Netskope"],
    bio: "Software Engineer in the Machine Learning domain at Nitor Infotech, with prior internship experience at cloud security leader Netskope.",
  },
];

export default function AlumConnect() {
  useReveal();

  useEffect(() => {
    document.title = "Alum Connect | IIT BHU Postgrad Mentorship";
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cohort: "Placement Guidance Cohort (M.Tech CS 2nd Year)",
    branch: "M.Tech CS (AI)",
    questions: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await addDoc(collection(db, "alum_connect_registrations"), {
        ...formData,
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString(),
        source: "alum_connect_page",
      });
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error("Error saving to Firebase: ", err);
      try {
        const existing = JSON.parse(
          localStorage.getItem("di_alum_registrations") || "[]",
        );
        existing.push({ ...formData, createdAt: new Date().toISOString() });
        localStorage.setItem("di_alum_registrations", JSON.stringify(existing));
        setSubmitted(true);
      } catch (localErr) {
        setErrorMsg(
          "Failed to submit form. Please check network connection and try again.",
        );
      }
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: 64,
        background: "#0F172A",
        minHeight: "100vh",
        color: "#F1F5F9",
      }}
    >
      {/* SEO Dynamic Metadata Elements */}
      <div className="sr-only">
        <h1>
          IIT BHU M.Tech CS Alum Connect - Placement & Internship Guidance
        </h1>
        <p>
          Direct mentorship from IIT BHU postgrads working at Oracle,
          HCLSoftware, Samsung Noida, Axtria, and Nitor Infotech.
        </p>
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "clamp(3rem, 6vw, 5rem) 0 3rem",
          overflow: "hidden",
        }}
      >
        {/* Background glow & Grid pattern */}
        <div
          className="bg-grid-pattern"
          style={{ position: "absolute", inset: 0, opacity: 0.15 }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(26,86,219,0.15) 50%, transparent 80%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 850, margin: "0 auto" }}>
            <div
              className="reveal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 9999,
                background: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                marginBottom: 20,
              }}
            >
              <Flame size={16} color="#A78BFA" />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#DDD6FE",
                  letterSpacing: "0.04em",
                }}
              >
                IIT BHU Postgrad Mentorship Initiative
              </span>
            </div>

            <h1
              className="reveal delay-100"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Crack Your Placement & Internship Season with{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">IIT BHU Alum Connect</span>
            </h1>

            <p
              className="reveal delay-200"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                color: "#94A3B8",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 740,
                margin: "0 auto 32px",
              }}
            >
              Learn directly from IIT BHU M.Tech CS postgrads who navigated
              campus drives, cleared top-tier tech interviews (Oracle,
              HCLSoftware, Samsung Noida, Axtria, Nitor Infotech, and more), and
              are helping juniors succeed.
            </p>

            {/* Quick Cohort Badges */}
            <div
              className="reveal delay-300"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "10px 18px",
                  borderRadius: 12,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Video size={18} color="#60A5FA" />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Live Sessions
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}
                  >
                    Google Meet Cohorts
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(236, 72, 153, 0.3)",
                  padding: "10px 18px",
                  borderRadius: 12,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Calendar size={18} color="#F472B6" />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Cohort Schedule
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}
                  >
                    Announcing Dates Soon!
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "10px 18px",
                  borderRadius: 12,
                  backdropFilter: "blur(10px)",
                }}
              >
                <ShieldCheck size={18} color="#34D399" />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Session Type
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}
                  >
                    Senior-Junior Guidance
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#register-form"
              className="btn-gradient reveal delay-400"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              Register for Guidance Cohort <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* COHORTS ANNOUNCEMENT CARDS */}
      <section style={{ padding: "4rem 0", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label reveal" style={{ marginBottom: 12 }}>
              Guidance Streams
            </div>
            <h2
              className="reveal delay-100"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
              }}
            >
              Tailored Guidance <span className="gradient-text">Cohorts</span>
            </h2>
            <p
              className="reveal delay-200"
              style={{ color: "#94A3B8", fontSize: 15, marginTop: 8 }}
            >
              Dedicated guidance streams tailored for M.Tech CS 2nd Year & 1st
              Year milestones.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Placement Cohort Card */}
            <div
              className="glass-card hover-lift reveal"
              style={{
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                background:
                  "linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.8) 100%)",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(59, 130, 246, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <Briefcase size={22} color="#60A5FA" />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(59, 130, 246, 0.15)",
                    color: "#93C5FD",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  For M.Tech CS 2nd Year
                </span>
              </div>

              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#F8FAFC",
                  marginBottom: 10,
                }}
              >
                Placement Guidance Cohort
              </h3>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Targeted for <strong>M.Tech CS 2nd year students</strong>{" "}
                gearing up for upcoming campus placement drives.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                {[
                  "Resume Shortlisting & Portfolio Reviews",
                  "Technical Interview Cracking Strategy (DSA, ML & Systems)",
                  "Insider Insights from Official Placement Reps (TPR & Volunteers)",
                  "Company-Specific Guidance ",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "#CBD5E1",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="#60A5FA"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: 10,
                  border: "1px dashed rgba(59, 130, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Clock size={16} color="#60A5FA" />
                <span
                  style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}
                >
                  Live Google Meet:{" "}
                  <strong style={{ color: "#F1F5F9" }}>
                    Announcing Dates Soon!
                  </strong>
                </span>
              </div>
            </div>

            {/* Intern Cohort Card */}
            <div
              className="glass-card hover-lift reveal delay-150"
              style={{
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                background:
                  "linear-gradient(135deg, rgba(88,28,135,0.25) 0%, rgba(15,23,42,0.8) 100%)",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(139, 92, 246, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <GraduationCap size={22} color="#C084FC" />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(139, 92, 246, 0.15)",
                    color: "#C084FC",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  For M.Tech CS 1st Year
                </span>
              </div>

              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#F8FAFC",
                  marginBottom: 10,
                }}
              >
                Intern Guidance Cohort
              </h3>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Designed for <strong>M.Tech CS 1st year students</strong> aiming
                for top summer tech internships.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                {[
                  "Early Resume Building Strategy",
                  "On-Campus & Off-Campus Internship Preparation",
                  "Coding Round Preparation Roadmap (LeetCode & Core CS)",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "#CBD5E1",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="#C084FC"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: 10,
                  border: "1px dashed rgba(139, 92, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Clock size={16} color="#C084FC" />
                <span
                  style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}
                >
                  Live Google Meet:{" "}
                  <strong style={{ color: "#F1F5F9" }}>
                    Announcing Dates Soon!
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* MEET OUR FEATURED SPEAKERS & MENTORS */}
      <section
        style={{
          padding: "4rem 0",
          background: "rgba(8, 14, 28, 0.6)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label reveal" style={{ marginBottom: 12 }}>
              IIT BHU Postgrads
            </div>
            <h2
              className="reveal delay-100"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
              }}
            >
              Meet Your{" "}
              <span className="gradient-text">Mentors & Speakers</span>
            </h2>
            <p
              className="reveal delay-200"
              style={{
                color: "#94A3B8",
                fontSize: 15,
                maxWidth: 650,
                margin: "10px auto 0",
              }}
            >
              IIT BHU postgrads working across industry leaders like Oracle,
              HCLSoftware, Samsung Noida, Axtria, and Nitor Infotech.
            </p>
          </div>

          <div
            className="speakers-grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {speakers.map((s, index) => (
              <div
                key={s.id}
                className="speaker-card reveal"
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {/* INITIALLY VISIBLE DETAILS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 20,
                      overflow: "hidden",
                      flexShrink: 0,
                      border: `2px solid ${s.color}`,
                      boxShadow: `0 0 20px ${s.color}45`,
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 19,
                        fontWeight: 800,
                        color: "#F8FAFC",
                        marginBottom: 3,
                      }}
                    >
                      {s.name}
                    </h3>
                    <div
                      style={{ fontSize: 13, fontWeight: 700, color: s.color }}
                    >
                      {s.role}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#CBD5E1",
                        fontWeight: 600,
                      }}
                    >
                      @ {s.company}
                    </div>
                  </div>
                </div>

                {/* Education Badge (Initially Visible) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    color: "#94A3B8",
                    background: "rgba(255,255,255,0.03)",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <GraduationCap size={15} color={s.color} />
                  <span>{s.education}</span>
                </div>

                {/* SCROLL UNROLL ANIMATION CONTAINER */}
                <div className="scroll-unroll-wrapper">
                  <div className="scroll-unroll-inner">
                    {/* Person Description / Bio */}
                    <p
                      style={{
                        fontSize: 13,
                        color: "#CBD5E1",
                        lineHeight: 1.7,
                        marginBottom: 16,
                      }}
                    >
                      {s.bio}
                    </p>

                    {/* Separate Quote Paragraph if present */}
                    {s.quote && (
                      <div className="quote-box" style={{ marginBottom: 16 }}>
                        {s.quote}
                      </div>
                    )}

                    {/* Received Final Offers From */}
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#CBD5E1",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Award size={14} color={s.color} />
                        <span>Received Final Offers From:</span>
                      </div>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {(
                          s.companiesOfferedRole ||
                          s.companiesSelected ||
                          s.interviewsCleared ||
                          []
                        ).map((company, cIdx) => (
                          <span
                            key={cIdx}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: 8,
                              background: `${s.color}15`,
                              color: "#F1F5F9",
                              border: `1px solid ${s.color}40`,
                            }}
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* REGISTRATION FORM SECTION (CONNECTED TO FIREBASE) */}
      <section
        id="register-form"
        style={{ padding: "4rem 0", position: "relative" }}
      >
        <div style={{ maxWidth: 750, margin: "0 auto", padding: "0 1rem" }}>
          <div
            className="glass-card reveal"
            style={{
              padding: "clamp(1.5rem, 4vw, 3rem)",
              borderRadius: 20,
              border: "1px solid rgba(124, 58, 237, 0.3)",
              background:
                "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            {!submitted ? (
              <>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div className="section-label" style={{ marginBottom: 10 }}>
                    Register Now
                  </div>
                  <h2
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      fontWeight: 800,
                      color: "#F8FAFC",
                    }}
                  >
                    Join the{" "}
                    <span className="gradient-text">Mentorship Sessions</span>
                  </h2>
                  <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 6 }}>
                    Submit your details below to receive Google Meet session
                    links & schedule.
                  </p>
                </div>

                {errorMsg && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      borderRadius: 10,
                      color: "#FCA5A5",
                      fontSize: 13,
                      marginBottom: 20,
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {/* Full Name */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          marginBottom: 6,
                        }}
                      >
                        Full Name <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#F8FAFC",
                          fontSize: 14,
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          marginBottom: 6,
                        }}
                      >
                        Email Address{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your.email@iitbhu.ac.in"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#F8FAFC",
                          fontSize: 14,
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {/* Contact Phone */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          marginBottom: 6,
                        }}
                      >
                        WhatsApp / Contact Number{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#F8FAFC",
                          fontSize: 14,
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Branch / Program Dropdown: ONLY M.Tech CS (AI) and M.Tech CS (IoT) */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#CBD5E1",
                          marginBottom: 6,
                        }}
                      >
                        Branch / Program{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          background: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#F8FAFC",
                          fontSize: 14,
                          outline: "none",
                        }}
                      >
                        <option value="M.Tech CS (AI)">M.Tech CS (AI)</option>
                        <option value="M.Tech CS (IoT)">M.Tech CS (IoT)</option>
                      </select>
                    </div>
                  </div>

                  {/* Guidance Preference: ONLY Placement Guidance Cohort or Intern Guidance Cohort */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#CBD5E1",
                        marginBottom: 8,
                      }}
                    >
                      Interested Guidance Cohort{" "}
                      <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 10,
                      }}
                    >
                      {[
                        {
                          label:
                            "Placement Guidance Cohort (M.Tech CS 2nd Year)",
                          value:
                            "Placement Guidance Cohort (M.Tech CS 2nd Year)",
                        },
                        {
                          label: "Intern Guidance Cohort (M.Tech CS 1st Year)",
                          value: "Intern Guidance Cohort (M.Tech CS 1st Year)",
                        },
                      ].map((cohortOption) => (
                        <label
                          key={cohortOption.value}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "12px 14px",
                            borderRadius: 10,
                            background:
                              formData.cohort === cohortOption.value
                                ? "rgba(124, 58, 237, 0.2)"
                                : "rgba(15, 23, 42, 0.6)",
                            border:
                              formData.cohort === cohortOption.value
                                ? "1px solid rgba(124, 58, 237, 0.6)"
                                : "1px solid rgba(255,255,255,0.08)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <input
                            type="radio"
                            name="cohort"
                            value={cohortOption.value}
                            checked={formData.cohort === cohortOption.value}
                            onChange={handleChange}
                            style={{ accentColor: "#8B5CF6" }}
                          />
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#F1F5F9",
                            }}
                          >
                            {cohortOption.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Questions */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#CBD5E1",
                        marginBottom: 6,
                      }}
                    >
                      Specific Questions for Mentors (Optional)
                    </label>
                    <textarea
                      name="questions"
                      rows={3}
                      placeholder="Ask anything regarding preparation, resume tips, or TPR advice..."
                      value={formData.questions}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "rgba(15, 23, 42, 0.8)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#F8FAFC",
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient"
                    style={{
                      marginTop: 6,
                      padding: "14px 24px",
                      fontSize: 15,
                      fontWeight: 700,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{" "}
                        Submitting...
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
              <div style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 9999,
                    background: "rgba(16, 185, 129, 0.2)",
                    border: "2px solid #10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Check size={30} color="#10B981" />
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#F8FAFC",
                    marginBottom: 10,
                  }}
                >
                  Registration Confirmed! 🎉
                </h3>
                <p
                  style={{
                    color: "#94A3B8",
                    fontSize: 14,
                    lineHeight: 1.6,
                    maxWidth: 480,
                    margin: "0 auto 20px",
                  }}
                >
                  Thank you,{" "}
                  <strong style={{ color: "#F1F5F9" }}>
                    {formData.fullName}
                  </strong>{" "}
                  ({formData.branch}). Your registration for the{" "}
                  <strong style={{ color: "#A78BFA" }}>
                    {formData.cohort}
                  </strong>{" "}
                  has been saved.
                </p>
                <div>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#94A3B8",
                      padding: "8px 18px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
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
