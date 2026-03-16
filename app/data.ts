export type Project = {
  title: string;
  id: string;
  folder?: string; // Bunny CDN folder name under /Projects/
  description?: string;
  collaborators?: string;
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
        folder: 'harvey-agents',
        date: '2025-06-01',
        dateRange: '2025-present',
        description:
          'Agentic workflows that enable Harvey to autonomously execute complex, multi-step legal tasks over extended periods.',
        collaborators:
          'In collaboration with Niko Grupen, Julio Pereyra, Phillip Cerles, Bjørn Rostad, Nikhil Patel, Matt Zerweck',
      },
      {
        title: 'Artifacts',
        id: 'harvey-artifacts',
        folder: 'harvey-artifacts',
        date: '2025-02-10',
        dateRange: '2024-2025',
        description:
          'Artifacts reimagines how users work with Harvey, moving beyond simple chat into a versatile interface for drafting, review, and analysis.',
        collaborators: 'In collaboration with Julio Pereyra, Bjørn Rostad, Matt Zerweck',
      },
      {
        title: 'Voice Mode, Thinking States, Dictation',
        id: 'harvey-voice-thinking-dictation',
        folder: 'harvey-voice-mode',
        date: '2025-04-01',
        dateRange: '2025-present',
        description:
          "Rebuilding our thinking states from the ground up that better demonstrates Harvey's reasoning capabilities, alongside voice mode and dictation.",
        collaborators: 'In collaboration with Phillip Cerles, Nikhil Patel',
      },
      {
        title: 'Review Grid',
        id: 'harvey-review-grid',
        folder: 'harvey-review-grid',
        date: '2024-09-15',
        dateRange: '2024',
        description:
          'A platform for extracting structured data across hundreds of documents simultaneously with AI-powered field detection and validation.',
        collaborators: 'In collaboration with Niko Grupen, Bjørn Rostad, Matt Zerweck',
      },
      {
        title: 'Harvey Mobile 1.0',
        id: 'harvey-mobile',
        folder: 'harvey-mobile',
        date: '2025-01-15',
        dateRange: '2025',
        description:
          "I helped incubate the mobile app at our first hackathon, extending Harvey's capabilities beyond the desktop, giving users the ability to review, draft, and collaborate seamlessly from anywhere.",
        collaborators: 'In collaboration with Julio Pereyra, Phillip Cerles, Nikhil Patel',
      },
      {
        title: 'Design System 1.0',
        id: 'harvey-design-system',
        folder: 'harvey-design-system',
        date: '2024-08-12',
        dateRange: '2024-2026',
        description:
          "I led the design systems team at Harvey from the design side, we rebuilt our entire system from the ground up for clarity, consistency, and scale. A foundational update that makes our design language more semantic and accessible.\n\nBy re-architecting the schema, we're future-proofing the design system. Whether we introduce new themes, accessibility modes, or product brands, this foundation will flex without forcing another major overhaul. It's a small shift now that unlocks long-term agility and consistency.",
        collaborators:
          'In collaboration with Niko Grupen, Bjørn Rostad, Nikhil Patel, Matt Zerweck',
      },
      {
        title: 'Vault Storage',
        id: 'harvey-vault',
        folder: 'harvey-vault',
        date: '2024-07-01',
        dateRange: '2024',
        collaborators: 'In collaboration with Julio Pereyra, Phillip Cerles',
      },
      {
        title: 'Multiplayer',
        id: 'harvey-multiplayer',
        folder: 'harvey-multiplayer',
        date: '2024-06-01',
        dateRange: '2024',
        collaborators: 'In collaboration with Niko Grupen, Bjørn Rostad, Matt Zerweck',
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
        folder: 'flexport-shipment-observability',
        date: '2023-03-15',
        dateRange: '2022-2023',
        description:
          'End-to-end visibility into shipment status, exceptions, and milestones across ocean, air, and trucking.',
        collaborators: 'In collaboration with Alex Chen, Sarah Kim, David Park',
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
        title: 'Rider & Driver App',
        id: 'uber-rider-driver-app',
        folder: 'uber-rider-driver-app',
        date: '2022-06-10',
        dateRange: '2022',
        collaborators: 'In collaboration with James Liu, Rachel Torres, Mike Anderson',
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
