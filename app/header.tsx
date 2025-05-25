'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Christopher Sim
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Designer
        </TextEffect>
      </div>
      <nav className="flex items-center space-x-6">
        <Link
          href="/craft"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Craft
        </Link>
        <Link
          href="/writing"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Writing
        </Link>
      </nav>
    </header>
  )
}
