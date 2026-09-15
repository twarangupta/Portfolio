export const stats = [
  { value: '$29M+', label: 'Contract value automated' },
  { value: '60%', label: 'Faster API latency' },
  { value: '35%', label: 'Less manual data processing' },
  { value: 'Top 10', label: 'of 200+ hackathon teams' },
];

export const experience = [
  {
    company: 'ZS Associates',
    role: 'Software Engineer',
    location: 'Pune, India',
    period: 'July 2024 – February 2026',
    projects: [
      {
        title: 'Enterprise Contract Decision Support Platform',
        clients: 'Pfizer, Merck',
        stack: ['Node.js', 'Express.js', 'MySQL', 'Redis', 'JWT', 'RBAC', 'AWS'],
        points: [
          'Reduced API latency by 60% (~500ms to ~200ms) under production load by re-architecting synchronous flows into asynchronous processing with a Redis caching layer.',
          'Cut manual processing time by 30% by designing and shipping REST APIs and backend services in Node.js and Express.js that automated contract-decision workflows across Pfizer and Merck engagements spanning $29M+ in contract value.',
          'Hardened multi-tenant APIs with JWT authentication, role-based access control (RBAC), and request rate limiting, isolating sensitive data and shielding services from abuse across every client environment.',
          'Modeled relational schemas and wrote SQL stored procedures on MySQL (Amazon RDS), applying design patterns to keep business logic consistent across deployments.',
          'Standardized feature delivery across the team by building a library of reusable service modules and React components, cutting duplicated code and speeding up new work.',
        ],
      },
      {
        title: 'Data Ingestion and Reconciliation Backend',
        clients: 'Sanofi',
        stack: ['Snowflake', 'SQL', 'IICS (Informatica)'],
        points: [
          'Designed and operated backend data pipelines that ingested and reconciled data across 4 source systems into a Snowflake data warehouse, processing ~4 GB/day on a daily refresh.',
          'Owned reliability across 6 pipelines and ~16 tables, monitoring jobs and resolving anomalies to drive production failure rates down 15–20%.',
          'Built automated data-validation and sanity checks that enforced business rules and data consistency before load, cutting manual effort by 35% and supporting decisions worth ~$4.3M in project revenue.',
        ],
      },
    ],
  },
  {
    company: 'Nirvana Studio',
    role: 'Software Engineer Intern',
    location: 'New Delhi, India',
    period: 'January 2023 – June 2023',
    projects: [
      {
        stack: ['React', 'Redux', 'Jest'],
        points: [
          'Shipped 10+ React and Redux UI features for a web app serving 10K+ users.',
          'Introduced Jest tests and clean-code standards that reduced rework during code reviews.',
        ],
      },
    ],
  },
];

export const education = {
  school: 'Maharaja Agrasen Institute of Technology',
  degree: 'Bachelor of Technology in Information Technology',
  gpa: '8.8 / 10',
  location: 'New Delhi, India',
  period: 'July 2020 – August 2024',
};

export const leadership = [
  'Team Lead, Smart India Hackathon — Top 10 ranking among 200+ participating teams.',
  'Mentored a software engineering intern on project architecture and development best practices, contributing to their successful conversion to a full-time role.',
];
