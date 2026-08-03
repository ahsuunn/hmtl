'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Menu } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/bpa', label: 'BPA' },
  { href: '/badsen', label: 'Badsen' },
  { href: '/envmovement', label: 'Laskar Hijau' },
  { href: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Prevent scrolling when mobile sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: 'rgba(247, 244, 213, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(15, 51, 10, 0.08)',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between md:justify-center h-16 relative">
          {/* Mobile Brand Title */}
          <Link href="/" className="md:hidden font-heading text-xl font-bold text-forest">
            HMTL ITB
          </Link>

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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-lg text-forest hover:bg-forest/10 transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Slide-Over Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-forest/50 backdrop-blur-xs transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="fixed top-0 bottom-0 right-0 w-72 bg-cream shadow-2xl flex flex-col p-6 z-50 border-l border-forest/10 animate-in slide-in-from-right duration-300"
            style={{ background: '#F7F4D5' }}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-forest/10">
              <div>
                <p className="font-heading text-xl font-bold text-forest">HMTL ITB</p>
                <p className="font-body text-xs opacity-60 text-forest">Teknik Lingkungan</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-forest hover:bg-forest/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col gap-3 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl font-body text-base font-medium transition-all ${
                      isActive
                        ? 'bg-forest text-cream font-semibold shadow-sm'
                        : 'text-forest hover:bg-forest/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="pt-6 border-t border-forest/10 text-xs opacity-60 text-forest text-center">
              © {new Date().getFullYear()} HMTL ITB
            </div>
          </div>
        </div>
      )}
    </>
  )
}
