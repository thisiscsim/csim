export type Project = {
  name: string;
  description: string;
  link: string;
  video: string;
  id: string;
  duration?: string;
  caseStudy?: {
    background: string;
    solution: string;
    impactDescription?: string;
    impact: {
      stat: string;
      label: string;
      description?: string;
    }[];
    credits: {
      text: string;
      people: {
        name: string;
        role: string;
        image: string;
      }[];
    };
    images?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  };
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
    title: 'Design Lead',
    start: '2024',
    end: 'Now',
    projects: [
      {
        name: 'Artifacts',
        description: 'Intelligent document templates and generation',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-7',
      },
      {
        name: 'File event log',
        description: 'Real-time event log for file uploads',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-2',
      },
      {
        name: 'Vault Projects & Knowledge Sources',
        description: 'Persistent workspaces for long context queries',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-3',
      },
      {
        name: 'Review Tables',
        description: 'Multi-document retrieval, extraction & generation',
        link: 'https://pro.motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-review-table',
        duration: '6 months',
        caseStudy: {
          background:
            "Empowering financial management is central to Arc's vision as a comprehensive banking platform. With limited functionalities in our payment offerings, our customers have lacked incentives to increase deposits and manage spend directly through our platform. This has led directly to slower growth in Asset Under Management (AUM) and increased customer churn to our competitors offering more complete solutions.",
          solution:
            'We developed Review Tables, a powerful interface that allows users to view and compare data across multiple documents in a structured table format. The solution enables users to extract, organize, and analyze information from various sources simultaneously.',
          impactDescription:
            'Review Tables was launched in the November of 2022 to Flex-Go Operators and Import Partners and has significantly improved our operations management process. We achieved a 6.5% increase in shipment on-time performance and saved over 250 hours previously spent triaging issues. These tangible improvements directly enhance customer satisfaction and operational efficiency.',
          impact: [
            {
              stat: '$1.2M+',
              label: 'Payments processed since launch',
            },
            {
              stat: '100+ Hours Saved',
              label: 'In time spent on bill consolidation',
            },
            {
              stat: '34% Uptick',
              label: 'In account deposits (AUM)',
            },
          ],
          credits: {
            text: "It's a huge privilege to have ownership over such a critical project and while I'm extremely proud of my role, it takes an entire village to get us across the line. Massive thanks to my key collaborators and many others.",
            people: [
              {
                name: 'Christopher Sim',
                role: 'Design Lead',
                image: '/images/credits/christopher-sim.jpg',
              },
              {
                name: 'Elliot Bensabat',
                role: 'Product Lead',
                image: '/images/credits/elliot-bensabat.jpg',
              },
              {
                name: 'Aniket Joshi',
                role: 'Engineering Lead',
                image: '/images/credits/aniket-joshi.jpg',
              },
              {
                name: 'Avi Khemani',
                role: 'Engineer',
                image: '/images/credits/avi-khemani.jpg',
              },
            ],
          },
          images: [
            {
              src: '/images/review-tables-1.png',
              alt: 'Review Tables Interface',
              caption: 'The main interface showing multiple documents in a table view',
            },
            {
              src: '/images/review-tables-2.png',
              alt: 'Data Extraction Process',
              caption: 'The data extraction and organization workflow',
            },
          ],
        },
      },
      {
        name: 'Vault File Browser',
        description: 'Full-featured DMS',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-4',
      },
      {
        name: 'Mobile 1.0',
        description: 'Native mobile experience for legal professionals',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-5',
      },
      {
        name: 'S-1 Workflow',
        description: 'Streamlined SEC filing preparation and review',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'harvey-6',
      },
    ],
  },
  {
    company: 'Arc',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2023',
    end: '2024',
    projects: [
      {
        name: 'Deposits',
        description: 'Faster, easier deposits for Arc users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-1',
      },
      {
        name: 'Notifications',
        description: 'Action center with granular, rule-based notification controls',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-4',
      },
      {
        name: 'Settings & Security',
        description: 'Strengthening account and financial security',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-3',
      },
      {
        name: 'Bill Pay',
        description: 'Unified platform to capture, scan, and automate invoice payments',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'arc-2',
      },
    ],
  },
  {
    company: 'Flexport',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2023',
    projects: [
      {
        name: 'Freight Forwarding App',
        description: 'Move shipments with realtime, actionable visibility and telemetry',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'flexport-1',
      },
    ],
  },
  {
    company: 'Uber',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2022',
    end: '2022',
    projects: [
      {
        name: 'En-route Delay Notification',
        description: 'Helping bridge the rider-driver communication',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
      },
    ],
  },
  {
    company: 'Independent',
    companyLink: 'https://arc.com',
    title: 'Product Designer',
    start: '2024',
    end: '?',
    projects: [
      {
        name: 'Moab [Backed by Elad Gil, Karim Atiyeh, SPC]',
        description: 'Equipment inventory tooling',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-1',
      },
      {
        name: 'Amend AI [Backed by Neo]',
        description: 'Bringing data integrity back to users',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'uber-2',
      },
      {
        name: 'Peach',
        description: 'Modern collaboration platform for distributed teams',
        link: 'https://motion-primitives.com/',
        video:
          'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
        id: 'independent-3',
      },
    ],
  },
];

export const EMAIL = 'your@email.com';
