import { Link } from 'react-router-dom';
import './Home.css';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const stats = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Years Coding', value: '3+' },
];

export default function Home() {
  return (
    <div className="page-wrapper home-page">
      {/* Hero */}
      <section className="hero section">
        <div className="container hero-inner">
          {/* Left: Text */}
          <div className="hero-content">
            <div className="hero-badge animate-fade-up" style={{ animationDelay: '0ms' }}>
              <span className="status-dot" />
              Available for opportunities
            </div>

            <h1 className="hero-title animate-fade-up" style={{ animationDelay: '80ms' }}>
              Hi, I'm <span className="gradient-text">Twaran</span> 👋
              <br />
              <span className="hero-subtitle-line">I build things for the web</span>
            </h1>

            <p className="hero-bio animate-fade-up" style={{ animationDelay: '160ms' }}>
              A software developer who loves turning ideas into clean, fast, and
              meaningful digital experiences. I enjoy working across the full stack —
              from polished UIs to scalable backends.
            </p>

            <div className="hero-actions animate-fade-up" style={{ animationDelay: '240ms' }}>
              <Link to="/projects" className="btn btn-primary" id="hero-projects-btn">
                View My Work <ArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline" id="hero-contact-btn">
                Get In Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats animate-fade-up" style={{ animationDelay: '320ms' }}>
              {stats.map((s) => (
                <div key={s.label} className="stat-item">
                  <span className="stat-value gradient-text">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile Photo */}
          <div className="hero-photo-wrap animate-fade" style={{ animationDelay: '200ms' }}>
            <div className="hero-photo-ring">
              <img
                src="/profile.png"
                alt="Twaran Gupta"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="about-teaser section">
        <div className="container about-inner">
          <div className="about-icon-wrap">
            <CodeIcon />
          </div>
          <div className="about-text">
            <h2 className="about-heading">
              Developer by choice, <span className="gradient-text">builder by nature</span>
            </h2>
            <p className="about-desc">
              I love the craft of building software — from architecting clean APIs
              to fine-tuning pixel-perfect interfaces. Currently focused on
              full-stack JavaScript/TypeScript, with a growing interest in developer
              tooling and open source.
            </p>
            <div className="about-tags">
              {['React', 'Node.js', 'PostgreSQL', 'Vite', 'Python'].map((t) => (
                <span key={t} className="tag tag-accent">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
