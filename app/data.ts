export type Project = {
  name: string;
  description: string;
  video: string;
  id: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide'; // landscape = 5:4, portrait = 4:5, wide = 3:2
};

export type ProjectGroup = {
  company: string;
  companyLink?: string;
  title?: string;
  start: string;
  end: string;
  description?: string;
  projects: Project[];
};

export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    company: 'Harvey',
    companyLink: 'https://harvey.com',
    title: 'Member of the Design Staff',
    start: '2024',
    end: 'Current',
    description:
      'Leading design for the frontier agentic AI platform for legal and professional services. Worked on core product experiences including Artifacts, file management, and mobile applications.',
    projects: [
      {
        name: 'Artifacts',
        description: 'New interface for working with Harvey that goes beyond a simple chat',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-7',
        aspectRatio: 'wide',
      },
      {
        name: 'File event log',
        description: 'Real-time event log for file uploads',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-2',
        aspectRatio: 'wide',
      },
      {
        name: 'Vault Projects & Knowledge Sources',
        description: 'Persistent workspaces for long context queries',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-3',
      },
      {
        name: 'Review Tables',
        description: 'Multi-document retrieval, extraction & generation',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-review-table',
      },
      {
        name: 'Vault File Browser',
        description: 'Full-featured DMS',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-4',
      },
      {
        name: 'Mobile 1.0',
        description: 'Native mobile experience for legal professionals',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-5',
      },
      {
        name: 'S-1 Workflow',
        description: 'What if Harvey can one-shot your S-1 filing?',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-6',
        aspectRatio: 'landscape',
      },
      {
        name: 'Word Add-In',
        description: 'Bringing Harvey to where the work is with our word add in',
        video: '/word-add-in.mp4',
        id: 'harvey-7',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    company: 'Arc',
    companyLink: 'https://arc.com',
    title: 'Senior Product Designer',
    start: '2023',
    end: '2024',
    description:
      'Designed core banking features to help startups manage their finances. Led projects across deposits, bill pay, notifications, and security infrastructure.',
    projects: [
      {
        name: 'Deposits',
        description: 'Faster, easier deposits for Arc users',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-1',
        aspectRatio: 'landscape',
      },
      {
        name: 'Notifications',
        description: 'Action center with granular, rule-based notification controls',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-4',
      },
      {
        name: 'Settings & Security',
        description: 'Strengthening account and financial security',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-3',
        aspectRatio: 'wide',
      },
      {
        name: 'Auto-Transfers',
        description:
          'Move money between Arc accounts automatically so you can manage cash flow or fund specific accounts without manual effort.',
        video: 'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/arc-auto-transfer.mp4',
        id: 'arc-5',
        aspectRatio: 'wide',
      },
      {
        name: 'Bill Pay',
        description: 'Unified platform to capture, scan, and automate invoice payments',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-2',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    company: 'Flexport',
    companyLink: 'https://flexport.com',
    title: 'Product Designer',
    start: '2022',
    end: '2023',
    description:
      'Built tools for modern freight forwarding with real-time visibility and telemetry. Designed experiences for shipment tracking, exception management, and supply chain operations.',
    projects: [
      {
        name: 'Freight Forwarding App',
        description:
          'Get real time visibility into the past, present and future legs of the shipment and triage issues inside and outside of your team',
        video:
          'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/flexport-real-time-visibility.mp4',
        id: 'flexport-1',
        aspectRatio: 'wide',
      },
      {
        name: 'Team View',
        description: 'Easily triage issues inside and outside of your team',
        video: 'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/flexport-shipment-list.mp4',
        id: 'flexport-2',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    company: 'Uber',
    companyLink: 'https://arc.com',
    title: 'Product Design Intern',
    start: '2022',
    end: '2022',
    description:
      'Worked with the rider team at Uber, designed 8 features across different touchpoints to bridge the trip experience between riders and drivers.',
    projects: [
      {
        name: 'En-route Delay Notification',
        description: 'Helping bridge the rider-driver communication',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
        aspectRatio: 'landscape',
      },
      {
        name: 'Pick-up Visibility',
        description: 'Improved visibility in finding the pick up location for riders',
        video:
          'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/uber-pick-up-visibility-rider-app.mp4',
        id: 'uber-2',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export const EMAIL = 'your@email.com';
