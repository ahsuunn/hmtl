'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/envmovement', label: 'ENVMovement' },
  { href: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(247, 244, 213, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15, 51, 10, 0.08)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-center h-16 relative">
        {/* Desktop Nav — centered */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger — positioned right */}
        <button
          className="md:hidden absolute right-6 flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 rounded transition-all duration-200"
            style={{
              background: 'var(--color-forest)',
              transform: open ? 'rotate(45deg) translateY(8px)' : undefined,
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-all duration-200"
            style={{
              background: 'var(--color-forest)',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-all duration-200"
            style={{
              background: 'var(--color-forest)',
              transform: open ? 'rotate(-45deg) translateY(-8px)' : undefined,
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col items-center gap-4"
          style={{ borderTop: '1px solid rgba(15, 51, 10, 0.08)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-lg ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
