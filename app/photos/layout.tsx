import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Photography collection by Christopher Sim',
};

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
