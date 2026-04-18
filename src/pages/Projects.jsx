import { projects } from '../data/projects';
import './Projects.css';

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card${project.featured ? ' featured' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      id={`project-card-${project.id}`}
    >
      {project.featured && (
        <span className="featured-badge">Featured</span>
      )}

      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="project-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>

      <div className="project-card-footer">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            id={`project-github-${project.id}`}
          >
            <GitHubIcon /> Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            id={`project-live-${project.id}`}
          >
            Live <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="page-wrapper projects-page">
      <div className="container">
        {/* Header */}
        <div className="page-header animate-fade-up">
          <span className="page-label">Portfolio</span>
          <h1 className="page-title">
            Things I've <span className="gradient-text">Built</span>
          </h1>
          <p className="page-desc">
            A selection of projects I've worked on — ranging from full-stack
            applications to experiments and open-source contributions.
          </p>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="projects-featured animate-fade-up" style={{ animationDelay: '100ms' }}>
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Other */}
        {others.length > 0 && (
          <>
            <h2 className="section-subtitle animate-fade-up" style={{ animationDelay: '200ms' }}>
              Other Projects
            </h2>
            <div className="projects-grid animate-fade-up" style={{ animationDelay: '280ms' }}>
              {others.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
