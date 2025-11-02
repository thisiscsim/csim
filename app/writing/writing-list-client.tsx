'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { NotionBlogPost } from '@/lib/notion/blog';

interface WritingListClientProps {
  posts: NotionBlogPost[];
}

export function WritingListClient({ posts }: WritingListClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="space-y-0">
        {years.map((year, yearIndex) => (
          <div key={year}>
            {/* Separator above each year section */}
            {yearIndex > 0 && <div className="border-b border-zinc-200" />}

            {postsByYear[year].map((post, index) => {
              const isHovered = hoveredId === post.id;
              const isMuted = hoveredId !== null && !isHovered;

              return (
                <div key={post.id}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="flex items-center gap-8 py-[12px] -mx-4 px-4 rounded-lg"
                    onMouseEnter={() => setHoveredId(post.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    prefetch={true}
                  >
                    {/* Year - only show for first post of each year, always full opacity */}
                    <div className="w-20 flex-shrink-0">
                      {index === 0 && (
                        <span
                          className="text-secondary"
                          style={{ fontSize: '14px', lineHeight: '20px' }}
                        >
                          {year}
                        </span>
                      )}
                    </div>

                    {/* Title - opacity changes on hover */}
                    <div
                      className="flex-1 transition-opacity duration-300"
                      style={{
                        opacity: isMuted ? 0.32 : 1,
                      }}
                    >
                      <h3 className="text-primary" style={{ fontSize: '14px', lineHeight: '20px' }}>
                        {post.title}
                      </h3>
                    </div>

                    {/* Date - opacity changes on hover */}
                    <div
                      className="w-16 flex-shrink-0 text-right transition-opacity duration-300"
                      style={{
                        opacity: isMuted ? 0.32 : 1,
                      }}
                    >
                      <span
                        className="text-secondary"
                        style={{ fontSize: '14px', lineHeight: '20px' }}
                      >
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </div>
                  </Link>

                  {/* Divider after each post except the last one in each year */}
                  {index < postsByYear[year].length - 1 && (
                    <div className="ml-28 border-b border-zinc-200" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
