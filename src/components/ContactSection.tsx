'use client'

import { MessageCircle, Mail, ExternalLink } from 'lucide-react'

interface Contact {
  label: string
  value: string
  href: string
  type: 'line' | 'instagram' | 'email'
}

interface ContactSectionProps {
  title: string
  contacts: Contact[]
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function renderIcon(type: Contact['type']) {
  if (type === 'line') return <MessageCircle className="w-4 h-4" strokeWidth={2} />
  if (type === 'instagram') return <InstagramIcon className="w-4 h-4" />
  return <Mail className="w-4 h-4" strokeWidth={2} />
}

export default function ContactSection({ title, contacts }: ContactSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div
        className="rounded-2xl px-8 py-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #01494B 0%, #0F330A 100%)' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'var(--color-green)' }}
        />
        <div
          className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full opacity-5"
          style={{ background: 'var(--color-cream)' }}
        />

        <div className="relative z-10">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-8"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {title}
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {contacts.map((contact) => {
              return (
                <a
                  key={contact.type}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-2 py-2 rounded-xl group transition-all duration-200"
                  style={{
                    background: 'rgba(247, 244, 213, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(247, 244, 213, 0.18)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(247, 244, 213, 0.1)'
                  }}
                >
                  <div
                    className="w-9 h-9 bg-forest/40 rounded-lg flex items-center justify-center flex-shrink-0 text-cream "
                  >
                    {renderIcon(contact.type)}
                  </div>
                  <div>
                    <p
                      className="font-body text-xs opacity-60 leading-none mb-0.5"
                      style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                    >
                      {contact.label}
                    </p>
                    <p
                      className="font-body text-sm font-semibold leading-none"
                      style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
                    >
                      {contact.value}
                    </p>
                  </div>
                  <ExternalLink
                    className="w-3.5 h-3.5 ml-auto opacity-40 group-hover:opacity-80 transition-opacity flex-shrink-0"
                    style={{ color: 'var(--color-cream)' }}
                    strokeWidth={2}
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
