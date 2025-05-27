'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextScramble } from '@/components/motion-primitives/text-scramble'
import { useState, useMemo, useEffect } from 'react'
import type { NotionBlogPost } from '@/lib/notion/blog'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useRouter } from 'next/navigation'

const FILTERS = ['All', 'Design', 'Technology', 'Society', 'Life']

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const TRANSITION_SECTION = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
}

export function WritingClient({ posts }: { posts: NotionBlogPost[] }) {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [infoTrigger, setInfoTrigger] = useState(false)
  const router = useRouter()

  // Generate filters dynamically from all unique categories
  const filters = useMemo(() => {
    const uniqueCategories = new Set<string>()
    posts.forEach(post => {
      post.categories?.forEach(category => uniqueCategories.add(category))
    })
    return ['All', ...Array.from(uniqueCategories).sort()]
  }, [posts])

  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === 'All') return true
    return post.categories?.includes(selectedFilter)
  })

  // Prefetch the next 3 posts when hovering over a post
  useEffect(() => {
    if (hoveredId) {
      const currentIndex = filteredPosts.findIndex(post => post.id === hoveredId)
      if (currentIndex !== -1) {
        // Prefetch next 3 posts
        for (let i = 1; i <= 3; i++) {
          const nextPost = filteredPosts[currentIndex + i]
          if (nextPost) {
            router.prefetch(`/writing/${nextPost.slug}`)
          }
        }
      }
    }
  }, [hoveredId, filteredPosts, router])

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <motion.main
        className="space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          {/* Info Block */}
          <div className="mb-0">
            <TextScramble
              as="h2"
              className="mb-1 text-zinc-400"
              trigger={infoTrigger}
              onHoverStart={() => setInfoTrigger(true)}
              onScrambleComplete={() => setInfoTrigger(false)}
            >
              Writing
            </TextScramble>
            <p>
              Infrequent thoughts on design, the future, current state of society, and life. These are in no way representative of my employer and are strictly my personal opinions. I use Notion as the CMS, and the list here updates automatically through the Notion API.
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="flex flex-row flex-wrap gap-1.5 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-2 py-0.5 rounded-md text-sm font-mono border-none focus:outline-none transition-colors ${
                  selectedFilter === filter
                    ? 'bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-900 font-medium dark:text-zinc-100'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
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
                    className={`-mx-3 rounded-lg px-3 py-4 block ${
                      hoveredId && hoveredId !== post.id ? 'opacity-50' : ''
                    }`}
                    href={`/writing/${post.slug}`}
                    data-id={post.id}
                    prefetch={true}
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-zinc-500 dark:text-zinc-400 min-w-[100px]">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
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
  )
} 