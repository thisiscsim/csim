'use client';

import { motion } from 'motion/react';

export default function InfoPage() {
  return (
    <div className="h-[calc(100vh-100px)] relative flex items-center justify-center px-4 md:px-6 lg:px-8">
      {/* Introduction Section */}
      <div className="max-w-3xl">
        <motion.h1
          className="text-[17px]/[26px] font-medium fg-base transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0 }}
        >
          Christopher Sim
        </motion.h1>
        <motion.h2
          className="text-[17px]/[26px] fg-subtle mb-4 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
        >
          Software designer based in San Francisco
        </motion.h2>

        <motion.div
          className="space-y-4 text-md/7 fg-base max-w-3xl transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
        >
          <p>
            Currently a software designer at{' '}
            <a
              href="https://harvey.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="fg-subtle hover:fg-base border-b border-dotted border-transparent hover:border-base transition-colors duration-300"
            >
              Harvey
              <sup>1</sup>
            </a>
            , building the frontier agentic AI platform for legal and professional services.
            Previously, worked with teams at{' '}
            <a
              href="https://flexport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fg-subtle hover:fg-base border-b border-dotted border-transparent hover:border-base transition-colors duration-300"
            >
              Flexport
              <sup>2</sup>
            </a>
            ,{' '}
            <a
              href="https://uber.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fg-subtle hover:fg-base border-b border-dotted border-transparent hover:border-base transition-colors duration-300"
            >
              Uber
              <sup>3</sup>
            </a>
            , and{' '}
            <a
              href="https://www.joinarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="fg-subtle hover:fg-base border-b border-dotted border-transparent hover:border-base transition-colors duration-300"
            >
              Arc
              <sup>4</sup>
            </a>
            . In my free time, I&apos;m a design consultant for emerging software companies backed
            by top VCs.
          </p>
          <p>
            I love working on niche problems and simplifying complexities so people can focus on
            more valuable work. I received my master&apos;s in Human-Computer Interaction from the
            University of Washington.
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="w-[40px] h-[1px] mt-8 transition-colors duration-300"
          style={{ backgroundColor: 'var(--border-base)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.15 }}
        />

        {/* Last updated */}
        <motion.p
          className="text-[12px] fg-muted mt-8 font-mono transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        >
          Last updated: January 3, 2026
        </motion.p>
      </div>
    </div>
  );
}
