import { experience, education, leadership, stats } from '../data/experience';
import './Experience.css';

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function Experience() {
  return (
    <div className="page-wrapper experience-page">
      <div className="container">
        {/* Header */}
        <div className="page-header exp-page-header animate-fade-up">
          <div>
            <span className="page-label">// Experience</span>
            <h1 className="page-title">Where I've Worked</h1>
            <p className="page-desc">
              1.5+ years building production systems for enterprise clients —
              from contract-decision platforms to large-scale data pipelines.
            </p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="btn btn-outline btn-sm"
            id="download-resume-btn"
          >
            <DownloadIcon /> Resume
          </a>
        </div>

        {/* Stats */}
        <div className="stat-row animate-fade-up">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        <div className="exp-timeline">
          {experience.map((job, i) => (
            <div
              className="exp-entry animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
              key={job.company}
              id={`experience-${job.company.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="exp-entry-header">
                <div>
                  <h2 className="exp-role">{job.role}</h2>
                  <p className="exp-company">{job.company} · {job.location}</p>
                </div>
                <span className="exp-period">{job.period}</span>
              </div>

              {job.projects.map((proj, j) => (
                <div className="exp-project" key={proj.title || j}>
                  {proj.title && (
                    <div className="exp-project-header">
                      <h3 className="exp-project-title">{proj.title}</h3>
                      {proj.clients && <span className="exp-clients">Clients: {proj.clients}</span>}
                    </div>
                  )}
                  <ul className="exp-points">
                    {proj.points.map((point, k) => (
                      <li key={k}>{point}</li>
                    ))}
                  </ul>
                  {proj.stack && (
                    <div className="exp-stack">
                      {proj.stack.map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Education */}
        <h2 className="section-subtitle animate-fade-up">Education</h2>
        <div className="education-card animate-fade-up">
          <div>
            <h3 className="edu-school">{education.school}</h3>
            <p className="edu-degree">{education.degree} · {education.location}</p>
          </div>
          <div className="edu-meta">
            <span className="exp-period">{education.period}</span>
            <span className="edu-gpa">CGPA: {education.gpa}</span>
          </div>
        </div>

        {/* Leadership */}
        <h2 className="section-subtitle animate-fade-up">Leadership &amp; Extracurricular</h2>
        <ul className="leadership-list animate-fade-up">
          {leadership.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
