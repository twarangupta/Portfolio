export const stats = [
  { value: '$29M+', label: 'Contract value automated' },
  { value: '60%', label: 'Faster API latency' },
  { value: '35%', label: 'Less manual data processing' },
  { value: 'Top 10', label: 'of 200+ hackathon teams' },
];

export const experience = [
  {
    company: 'ZS Associates',
    role: 'Software Development Engineer',
    location: 'Pune, Maharashtra',
    period: 'July 2024 – February 2026',
    projects: [
      {
        title: 'Enterprise Contract Decision Support Platform',
        clients: 'Pfizer, Merck',
        stack: ['Node.js', 'Express.js', 'TypeScript', 'Redis', 'MySQL', 'React', 'Redux', 'JWT', 'RBAC'],
        points: [
          'Built REST/JSON APIs in Node.js, Express.js, and TypeScript that automated contract-decision workflows end to end across Pfizer and Merck engagements spanning $29M+ in contract value, cutting manual processing time by 30%.',
          'Re-architected synchronous flows into asynchronous processing with Redis caching, reducing API latency by 60% (~500ms to ~200ms) under production load — earning a Client Appreciation Award.',
          'Authored SQL stored procedures on MySQL (Amazon RDS) and applied OOP design patterns to encapsulate business logic, reducing backend overhead and guaranteeing data consistency across deployments.',
          'Enforced data isolation with JWT authentication and role-based access control (RBAC), securing sensitive multi-tenant data across every client environment.',
          'Built a reusable React and Redux component library adopted by the team to standardize the review UI and accelerate feature delivery.',
        ],
      },
      {
        title: 'Centralized Enterprise Data Warehouse',
        clients: 'Sanofi',
        stack: ['IICS (Informatica)', 'Snowflake', 'SQL', 'ETL'],
        points: [
          'Built ETL ingestion and transformation pipelines in IICS (Informatica) into a Snowflake warehouse, automating SQL validation to cut manual data-processing effort by 35%.',
          'Owned production pipeline monitoring and anomaly resolution, driving failure rates down 15–20%.',
          'Engineered a one-click refresh pipeline that ingested and reconciled data across multiple source systems with automated sanity checks — relied on by C-suite stakeholders for critical decisions, contributing to approximately $4.3M in project revenue.',
        ],
      },
    ],
  },
  {
    company: 'Nirvana Studio',
    role: 'Software Development Engineer Intern',
    location: 'New Delhi',
    period: 'January 2023 – June 2023',
    projects: [
      {
        stack: ['React', 'Redux', 'Jest'],
        points: [
          'Shipped 10+ UI features and components with React.js and Redux across an application serving 10K+ users.',
          'Established clean-code standards and testing with Jest, reducing rework during code reviews.',
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
