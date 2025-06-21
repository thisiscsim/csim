'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { useState, useMemo, useCallback } from 'react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TRANSITION_SECTION = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

export function WritingClient({ posts }: { posts: NotionBlogPost[] }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  // Generate filters dynamically from all unique categories
  const filters = useMemo(() => {
    const uniqueCategories = new Set<string>();
    posts.forEach((post) => {
      post.categories?.forEach((category) => uniqueCategories.add(category));
    });
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedFilter === 'All') return true;
      return post.categories?.includes(selectedFilter);
    });
  }, [posts, selectedFilter]);

  // Prefetch all visible posts on mount for better performance
  const prefetchPosts = useCallback(() => {
    // Prefetch the first 5 posts immediately
    filteredPosts.slice(0, 5).forEach((post) => {
      router.prefetch(`/writing/${post.slug}`);
    });
  }, [filteredPosts, router]);

  // Run prefetch when filtered posts change
  useMemo(() => {
    prefetchPosts();
  }, [prefetchPosts]);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />

      <motion.main
        className="space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          {/* Info Block */}
          <div className="mb-0">
            <h2 className="mb-1 text-zinc-400">Writing</h2>
            <p>
              Infrequent thoughts on design, the future, current state of society, and life. These
              are in no way representative of my employer and are strictly my personal opinions. I
              use Notion as the CMS, and the list here updates automatically through the Notion API.
            </p>
          </div>
        </motion.section>

        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="mb-6">
            <Breadcrumbs
              classNames={{
                list: 'gap-1.5 flex-wrap',
              }}
              itemClasses={{
                item: [
                  'px-2 py-0.5 rounded-md text-sm font-mono transition-colors cursor-pointer',
                  'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400',
                  'hover:bg-zinc-200/50 hover:dark:bg-zinc-800/50 hover:text-zinc-700 hover:dark:text-zinc-300',
                  'data-[current=true]:bg-zinc-200/70 data-[current=true]:dark:bg-zinc-700/70',
                  'data-[current=true]:text-zinc-900 data-[current=true]:font-medium data-[current=true]:dark:text-zinc-100',
                  'data-[current=true]:hover:bg-zinc-200/70 data-[current=true]:hover:dark:bg-zinc-700/70',
                ],
                separator: 'hidden',
              }}
              size="sm"
              onAction={(key) => setSelectedFilter(key as string)}
            >
              {filters.map((filter) => (
                <BreadcrumbItem key={filter} isCurrent={selectedFilter === filter}>
                  {filter}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          <div className="flex flex-col space-y-0">
            <div className="relative">
              <AnimatedBackground
                enableHover
                className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900"
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3,
                }}
                onValueChange={setHoveredId}
              >
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    className={`-mx-3 rounded-lg px-3 py-4 block transition-opacity duration-300 ${
                      hoveredId && hoveredId !== post.id ? 'opacity-50' : ''
                    }`}
                    href={`/writing/${post.slug}`}
                    data-id={post.id}
                    prefetch={true}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-zinc-500 dark:text-zinc-400 min-w-[120px]">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <h4 className="font-medium dark:text-zinc-100 min-w-[200px] flex-1">
                        {post.title}
                      </h4>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-row gap-2 ml-auto">
                          <p className="text-zinc-500 dark:text-zinc-400">
                            {post.categories.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </AnimatedBackground>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
}
