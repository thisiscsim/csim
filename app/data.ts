export type Project = {
  title: string;
  id: string;
  aspectRatio?: '16:9' | '3:4'; // defaults to 16:9 in the roll
  description?: string;
  date: string; // ISO date string (YYYY-MM-DD)
};

export const PROJECTS: Project[] = [
  {
    title: 'Harvey Artifacts',
    id: 'harvey-artifacts',
    date: '2025-02-10',
    description:
      'Artifacts reimagines how users work with Harvey, moving beyond simple chat into a versatile interface for drafting, review, and analysis.',
  },
  {
    title: 'Harvey Word Add-In',
    id: 'harvey-word',
    date: '2025-10-24',
    description:
      'Draft and review documents and contracts faster with analysis, playbooks, and integrated knowledge with our word plugin.',
  },
  {
    title: 'Harvey S-1 Shell Workflow',
    id: 'harvey-s1-shell',
    date: '2025-09-12',
    description: "Agentic workflow where Harvey could one-shot a company's S-1 filing",
  },
  {
    title: 'Harvey Mobile',
    id: 'harvey-mobile',
    date: '2024-10-05',
    description:
      "I helped incubate the mobile app at our first hackathon, extending Harvey's capabilities beyond the desktop, giving users the ability to review, draft, and collaborate seamlessly from anywhere.",
  },
  {
    title: 'Harvey Design System',
    id: 'harvey-design-system',
    date: '2024-08-12',
    description:
      'Design system built from the ground up for clarity, consistency, and scale, making our design language more semantic and accessible.',
  },
  {
    title: 'Harvey Event File Logging',
    id: 'harvey-event-file-logging',
    date: '2024-06-28',
    description:
      "Clear, transparent insight into document uploads—why files fail, what's processing, and which documents needs attention.",
  },
  {
    title: 'Harvey Thinking States',
    id: 'harvey-thinking-state',
    date: '2024-05-03',
    description:
      "Rebuilding our thinking states from the ground up that better demonstrates Harvey's reasoning capabilities through different tasks.",
  },
  {
    title: 'Harvey File Grouping & Monitoring',
    id: 'harvey-file-grouping',
    date: '2024-03-18',
    description:
      "Rebuilding our thinking states from the ground up that better demonstrates Harvey's reasoning capabilities through different tasks.",
  },
  {
    title: 'Harvey Review Grid Animations',
    id: 'harvey-review-grid-animations',
    date: '2024-01-22',
    description:
      "Rebuilding our thinking states from the ground up that better demonstrates Harvey's reasoning capabilities through different tasks.",
  },
  {
    title: 'Harvey S-1 Risk Factors Workflow',
    id: 'harvey-s1-risk-factors',
    date: '2023-12-08',
    description:
      'Agentic workflow where Harvey can automatically generate risk factors by automatically extracting data from files or the SEC itself',
  },
  {
    title: 'Exa Search',
    id: 'exa-search',
    date: '2023-09-15',
    description:
      "I freelanced with Exa for a week to help them conceptualize their new search product that's not only tailored for humans but agents as well.",
  },
  {
    title: 'Uber Motion',
    id: 'uber-motion',
    date: '2022-04-20',
    description:
      'When I was at Uber, I also had my first taste of motion design, I conceptualized and developed an interactive sequence for the rider journey from start to finish.',
  },
  {
    title: 'Icons for Arc',
    id: 'arc-icons',
    date: '2022-02-15',
    description:
      'As part of the design system work at Arc, I hand drew these icons to ensure we have full coverage for our ever expanding product surface area.',
  },
];

export const EMAIL = 'your@email.com';
