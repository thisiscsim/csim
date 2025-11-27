export type Project = {
  title: string;
  year: string;
  media: string;
  id: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide'; // landscape = 5:4, portrait = 4:5, wide = 3:2
};

export const PROJECTS: Project[] = [
  {
    title: 'Harvey Artifacts',
    year: '2025',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-artifacts',
    aspectRatio: 'wide',
  },
  {
    title: 'Harvey Multi-Document Extraction',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-review-table',
  },
  {
    title: 'Harvey Mobile',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-mobile',
  },
  {
    title: 'Harvey Agentic Workflow',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-s1',
    aspectRatio: 'landscape',
  },
  {
    title: 'Harvey Vault',
    year: '2024',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-vault',
    aspectRatio: 'wide',
  },
  {
    title: 'Harvey Design System',
    year: '2025',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'harvey-design-system',
    aspectRatio: 'wide',
  },
  {
    title: 'Harvey Word Add-In',
    year: '2024',
    media: '/word-add-in.mp4',
    id: 'harvey-word',
    aspectRatio: 'landscape',
  },
  {
    title: 'Exa Search',
    year: '2025',
    media: 'https://csim.b-cdn.net/Projects/exa_search.webp',
    id: 'exa-search',
    aspectRatio: 'wide',
  },
  {
    title: 'Arc Deposits',
    year: '2023',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'arc-deposits',
    aspectRatio: 'landscape',
  },
  {
    title: 'Arc Auto-Transfers',
    year: '2023',
    media: 'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/arc-auto-transfer.mp4',
    id: 'arc-auto-transfer',
    aspectRatio: 'wide',
  },
  {
    title: 'Arc Onboarding',
    year: '2023',
    media: '/temp-cover/placeholder_1.png',
    id: 'arc-onboarding',
    aspectRatio: 'wide',
  },
  {
    title: 'Arc Bill Pay',
    year: '2023',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'arc-billpay',
    aspectRatio: 'wide',
  },
  {
    title: 'Arc Design System',
    year: '2023',
    media: '/temp-cover/placeholder_1.png',
    id: 'arc-design-system',
    aspectRatio: 'wide',
  },
  {
    title: 'Flexport Freight Forwarding App',
    year: '2022',
    media:
      'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/flexport-real-time-visibility.mp4',
    id: 'flexport-freight',
    aspectRatio: 'wide',
  },
  {
    title: 'Uber Delay Notification',
    year: '2022',
    media:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'uber-delay',
    aspectRatio: 'landscape',
  },
  {
    title: 'Uber Pick-Up Visibility',
    year: '2022',
    media:
      'https://armadillo-labs.s3.us-west-1.amazonaws.com/csim/uber-pick-up-visibility-rider-app.mp4',
    id: 'uber-pickup',
    aspectRatio: 'landscape',
  },
];

export const EMAIL = 'your@email.com';
