export type Project = {
  title: string;
  id: string;
  aspectRatio?: '16:9' | '3:4' | '1:1' | '4:5' | '5:3';
  description?: string;
  date: string; // ISO date string for sorting (YYYY-MM-DD)
  dateRange: string; // Display string e.g. "2024-2025", "2025-present"
};

export type Company = {
  name: string;
  id: string;
  category?: string;
  description?: string;
  link?: string;
  projects: Project[];
};

export const COMPANIES: Company[] = [
  {
    name: 'Harvey',
    id: 'harvey',
    category: '2024 - Current',
    link: 'https://harvey.ai',
    description:
      'I joined Harvey in 2024 as part of the founding design team, with work spanning nearly every facet of the product. I lead design across our multi-document retrieval and extraction platform, internal storage solution, and design system, and have also contributed to agentic workflows, the Word add-in, and the incubation of our mobile app. This work helped scale Harvey from $25M to over $150M in ARR within a year.',
    projects: [
      {
        title: 'Long-Horizon Agents',
        id: 'harvey-long-horizon-agents',
        date: '2025-06-01',
        dateRange: '2025-present',
        description:
          'Agentic workflows that enable Harvey to autonomously execute complex, multi-step legal tasks over extended periods.',
      },
      {
        title: 'Artifacts',
        id: 'harvey-artifacts',
        date: '2025-02-10',
        dateRange: '2024-2025',
        description:
          'Artifacts reimagines how users work with Harvey, moving beyond simple chat into a versatile interface for drafting, review, and analysis.',
      },
      {
        title: 'Voice Mode, Thinking States, Dictation',
        id: 'harvey-voice-thinking-dictation',
        date: '2025-04-01',
        dateRange: '2025-present',
        description:
          "Rebuilding our thinking states from the ground up that better demonstrates Harvey's reasoning capabilities, alongside voice mode and dictation.",
      },
      {
        title: 'Multi-Document Extraction',
        id: 'harvey-multi-document-extraction',
        date: '2024-09-15',
        dateRange: '2024',
        description:
          'A platform for extracting structured data across hundreds of documents simultaneously with AI-powered field detection and validation.',
      },
      {
        title: 'Harvey Mobile 1.0',
        id: 'harvey-mobile',
        aspectRatio: '3:4',
        date: '2025-01-15',
        dateRange: '2025',
        description:
          "I helped incubate the mobile app at our first hackathon, extending Harvey's capabilities beyond the desktop, giving users the ability to review, draft, and collaborate seamlessly from anywhere.",
      },
      {
        title: 'Design System 1.0',
        id: 'harvey-design-system',
        date: '2024-08-12',
        dateRange: '2024-2026',
        description:
          'Design system built from the ground up for clarity, consistency, and scale, making our design language more semantic and accessible.',
      },
    ],
  },
  {
    name: 'Flexport',
    id: 'flexport',
    category: '2022 - 2023',
    link: 'https://flexport.com',
    description:
      'At Flexport, I worked on the shipment visibility and data platform teams, designing tools that gave freight forwarders and shippers real-time insight into their global supply chains.',
    projects: [
      {
        title: 'Shipment Observability',
        id: 'flexport-shipment-observability',
        date: '2023-03-15',
        dateRange: '2022-2023',
        description:
          'End-to-end visibility into shipment status, exceptions, and milestones across ocean, air, and trucking.',
      },
      {
        title: 'Data Authority',
        id: 'flexport-data-authority',
        date: '2022-09-20',
        dateRange: '2022',
        description:
          "A platform for establishing authoritative data sources and ensuring consistency across Flexport's logistics network.",
      },
    ],
  },
  {
    name: 'Uber',
    id: 'uber',
    category: '2021 - 2022',
    link: 'https://uber.com',
    description:
      'At Uber, I worked on the rider experience team, focusing on motion design and interactive prototypes that brought the journey from pickup to destination to life.',
    projects: [
      {
        title: 'Delay Notification',
        id: 'uber-delay-notification',
        date: '2022-06-10',
        dateRange: '2022',
        description:
          'Proactive notification system that keeps riders informed about delays with transparent ETAs and contextual updates.',
      },
      {
        title: 'Pick-up Location Interaction',
        id: 'uber-pickup-location',
        date: '2022-04-20',
        dateRange: '2022',
        description:
          'Redesigned the pick-up location experience to reduce rider confusion and driver wait times through clearer map interactions.',
      },
    ],
  },
];

// Flatten all projects in display order (by company order, then project order within company)
export const ALL_PROJECTS: Project[] = COMPANIES.flatMap((company) => company.projects);

// Lookup: project ID -> company
export function getCompanyForProject(projectId: string): Company | undefined {
  return COMPANIES.find((c) => c.projects.some((p) => p.id === projectId));
}

// Lookup: project by ID
export function getProjectById(projectId: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.id === projectId);
}
