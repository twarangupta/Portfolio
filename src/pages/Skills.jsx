import { skills } from '../data/skills';
import './Skills.css';

function SkillCategory({ category, index }) {
  return (
    <div
      className="skill-card animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
      id={`skill-category-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="skill-card-header">
        <span className="skill-icon">{category.icon}</span>
        <h3 className="skill-category">{category.category}</h3>
      </div>
      <div className="skill-items">
        {category.items.map((item) => (
          <span key={item} className="skill-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="page-wrapper skills-page">
      <div className="container">
        {/* Header */}
        <div className="page-header animate-fade-up">
          <span className="page-label">Toolkit</span>
          <h1 className="page-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h1>
          <p className="page-desc">
            The languages, frameworks, and tools I use to bring ideas to life.
            Always learning, always adding to the list.
          </p>
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <SkillCategory key={cat.category} category={cat} index={i} />
          ))}
        </div>

        {/* Learning banner */}
        <div className="learning-banner animate-fade-up" style={{ animationDelay: '480ms' }}>
          <span className="learning-emoji">🚀</span>
          <div>
            <p className="learning-title">Always Learning</p>
            <p className="learning-desc">
              Currently exploring TypeScript, Docker, and cloud architecture.
              If it's interesting, I'll probably learn it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
