'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogClose,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextScramble } from '@/components/motion-primitives/text-scramble'
import {
  PROJECT_GROUPS,
  WORK_EXPERIENCE,
  EMAIL,
  SOCIAL_LINKS,
} from './data'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CaseStudyDialog } from '@/components/case-study-dialog'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export default function Personal() {
  // Info
  const [infoTrigger, setInfoTrigger] = useState(true);
  useEffect(() => { setInfoTrigger(true); }, []);
  // Location
  const [locationTrigger, setLocationTrigger] = useState(true);
  useEffect(() => { setLocationTrigger(true); }, []);
  // Currently
  const [currentlyTrigger, setCurrentlyTrigger] = useState(true);
  useEffect(() => { setCurrentlyTrigger(true); }, []);
  // Connect
  const [connectTrigger, setConnectTrigger] = useState(true);
  useEffect(() => { setConnectTrigger(true); }, []);

  return (
    <motion.main
      className="space-y-32"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* --- TOP SECTION: Info + 3-column grid --- */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="mb-24"
      >
        {/* Info Block */}
        <div className="mb-20">
          <TextScramble
            as="h2"
            className="mb-1 text-zinc-400"
            trigger={infoTrigger}
            onHoverStart={() => setInfoTrigger(true)}
            onScrambleComplete={() => setInfoTrigger(false)}
          >
            Info
          </TextScramble>
          <p>
            Chris (He/Him) designs interfaces. He thrives in complex, ambiguous problem spaces focused around interactive media, digital tooling, and multimodal interaction. He studied Human-Computer Interaction at the University of Washington. Previously, he's worked with teams at{' '}
            <a href="https://flexport.com" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100">Flexport</a>,{' '}
            <a href="https://uber.com" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100">Uber</a> and{' '}
            <a href="https://arc.com" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100">Arc</a>. Here are some of his featured work.
          </p>
        </div>
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location */}
          <div>
            <TextScramble
              as="h3"
              className="mb-1 text-zinc-400"
              trigger={locationTrigger}
              onHoverStart={() => setLocationTrigger(true)}
              onScrambleComplete={() => setLocationTrigger(false)}
            >
              Location
            </TextScramble>
            <p>37.8044° N, 122.2711° W</p>
            <p>Oakland, CA</p>
          </div>
          {/* Currently */}
          <div>
            <TextScramble
              as="h3"
              className="mb-1 text-zinc-400"
              trigger={currentlyTrigger}
              onHoverStart={() => setCurrentlyTrigger(true)}
              onScrambleComplete={() => setCurrentlyTrigger(false)}
            >
              Currently
            </TextScramble>
            <p>Member of the Design staff</p>
            <p>Harvey</p>
          </div>
          {/* Connect */}
          <div>
            <TextScramble
              as="h3"
              className="mb-1 text-zinc-400"
              trigger={connectTrigger}
              onHoverStart={() => setConnectTrigger(true)}
              onScrambleComplete={() => setConnectTrigger(false)}
            >
              Connect
            </TextScramble>
            <a href={`mailto:${EMAIL}`} className="text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100">
              {EMAIL}
            </a>
            <br></br>
            <a href="https://www.instagram.com/thisiscsim/" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100">@thisiscsim</a>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex flex-col gap-20">
          {PROJECT_GROUPS.map((group, idx) => {
            // Date
            const [dateTrigger, setDateTrigger] = useState(true);
            useEffect(() => { setDateTrigger(true); }, []);
            // Company
            const [companyTrigger, setCompanyTrigger] = useState(true);
            useEffect(() => { setCompanyTrigger(true); }, []);
            return (
              <div key={group.company + group.start + group.end} className="flex flex-row gap-8 items-start relative">
                {/* Left column: Sticky header for date/company */}
                <div className="w-46 flex-shrink-0 sticky top-10 z-10 self-start bg-transparent backdrop-blur-sm">
                  <TextScramble
                    as="span"
                    className="block text-md text-zinc-400"
                    trigger={dateTrigger}
                    onHoverStart={() => setDateTrigger(true)}
                    onScrambleComplete={() => setDateTrigger(false)}
                  >
                    {`${group.start} - ${group.end}`}
                  </TextScramble>
                  <span className="block text-md font-semibold text-zinc-700 dark:text-zinc-200">
                    <TextScramble
                      as="span"
                      trigger={companyTrigger}
                      onHoverStart={() => setCompanyTrigger(true)}
                      onScrambleComplete={() => setCompanyTrigger(false)}
                    >
                      {group.company}
                    </TextScramble>
                  </span>
                </div>
                {/* Right column: Projects for this group */}
                <div className="flex-1 flex flex-col gap-10">
                  {/* Role description paragraph above all projects */}
                  {group.description && (
                    <p className="mb-4 text-base">{group.description}</p>
                  )}
                  {group.projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="relative rounded-2xl bg-zinc-50/40 dark:bg-zinc-950/40">
                        <CaseStudyDialog
                          trigger={
                            <div className="cursor-pointer">
                              <video
                                src={project.video}
                                autoPlay
                                loop
                                muted
                                className="aspect-video w-full rounded-lg"
                              />
                              <div className="mt-4">
                                <h3 className="font-base font-medium group relative inline-block font-[450] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 hover:text-zinc-600 dark:hover:text-zinc-300">
                                  {project.name}
                                </h3>
                                <p className="font-base text-zinc-600 dark:text-zinc-400">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          }
                          project={project}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium">Contact</h3>
            <a
              href={`mailto:${EMAIL}`}
              className="text-text-md text-zinc-900 dark:text-zinc-100 border-b border-dotted border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100"
            >
              {EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.main>
  )
}
