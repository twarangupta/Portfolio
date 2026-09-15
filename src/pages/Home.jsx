import { Link } from 'react-router-dom';
import Terminal from '../components/Terminal';
import './Home.css';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Home() {
  return (
    <div className="page-wrapper home-page">
      {/* Hero */}
      <section className="hero section">
        <div className="container hero-inner">
          {/* Left: Text */}
          <div className="hero-content">
            <span className="hero-eyebrow animate-fade-up" style={{ animationDelay: '40ms' }}>
              // Backend Software Engineer
            </span>

            <h1 className="hero-title animate-fade-up" style={{ animationDelay: '120ms' }}>
              Building
              <br />
              Backend
              <br />
              Systems
              <br />
              That Scale
            </h1>

            <p className="hero-bio animate-fade-up" style={{ animationDelay: '220ms' }}>
              1.5+ years building backend systems in Node.js and Express —
              from enterprise contract workflows to large-scale data pipelines
              for Fortune 500 enterprises.
            </p>

            <div className="hero-actions animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Link to="/projects" className="btn btn-primary" id="hero-projects-btn">
                View Projects <ArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline" id="hero-contact-btn">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="hero-terminal-wrap animate-fade" style={{ animationDelay: '160ms' }}>
            <Terminal />
          </div>
        </div>
      </section>
    </div>
  );
}
