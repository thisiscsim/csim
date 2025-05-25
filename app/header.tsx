'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="Christopher Sim"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-6">
        <Link
          href="/craft"
          className="text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Craft
        </Link>
        <Link
          href="/writing"
          className="text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Writing
        </Link>
      </nav>
    </header>
  )
}
