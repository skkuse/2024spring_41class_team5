'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full max-w-12c h-16 flex items-center justify-between">
      <h1 className="font-bold text-green-800">Eco Merge</h1>
      <nav>
        <ul className="flex gap-8">
          <li className="flex">
            <Link href="/">Home</Link>
            {pathname.split('/')[1] === '' && (
              <div className="absolute translate-x-1 -translate-y-0.5 rounded w-1 h-1 bg-green-800" />
            )}
          </li>
          <li className="flex">
            <Link href="/dashboard">Dashboard</Link>
            {pathname.split('/')[1] === 'dashboard' && (
              <div className="absolute translate-x-1 -translate-y-0.5 rounded w-1 h-1 bg-green-800" />
            )}
          </li>
          <li className="flex">
            <Link href="/login">Login</Link>
            {pathname.split('/')[1] === 'login' && (
              <div className="absolute translate-x-1 -translate-y-0.5 rounded w-1 h-1 bg-green-800" />
            )}
          </li>
          <li className="flex">
            <Link href="/signup">Sign Up</Link>
            {pathname.split('/')[1] === 'signup' && (
              <div className="absolute translate-x-1 -translate-y-0.5 rounded w-1 h-1 bg-green-800" />
            )}
          </li>
          <li className="flex">
            <Link href="/profile">Profile</Link>
            {pathname.split('/')[1] === 'profile' && (
              <div className="absolute translate-x-1 -translate-y-0.5 rounded w-1 h-1 bg-green-800" />
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
