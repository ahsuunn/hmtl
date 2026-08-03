'use client'

import { useState } from 'react'
import {
  FileText,
  Globe,
  BarChart3,
  BookOpen,
  Leaf,
  Wrench,
  Share2,
  Landmark,
  ExternalLink,
  LucideIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface PageLink {
  id: string
  title: string
  url: string
  description?: string
  category: string
  icon?: string
}

interface PageLinkCardsProps {
  links: PageLink[]
  defaultVisible?: number
}

const iconComponentMap: Record<string, LucideIcon> = {
  document: FileText,
  link: Globe,
  data: BarChart3,
  book: BookOpen,
  environment: Leaf,
  tool: Wrench,
  social: Share2,
  official: Landmark,
}

function LinkCard({ link }: { link: PageLink }) {
  const IconComponent = iconComponentMap[link.icon || 'link'] || Globe

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-5 flex gap-4 items-start group cursor-pointer"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: 'rgba(1, 73, 75, 0.08)', color: 'var(--color-teal)' }}
      >
        <IconComponent className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="font-body font-semibold text-base truncate group-hover:text-teal transition-colors"
          style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
        >
          {link.title}
        </p>
        {link.description && (
          <p
            className="font-body text-sm opacity-60 mt-1 line-clamp-2"
            style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
          >
            {link.description}
          </p>
        )}
        {link.category && (
          <span
            className="inline-block mt-2 px-2 py-0.5 rounded-md text-xs font-body"
            style={{
              background: 'rgba(124, 161, 52, 0.12)',
              color: '#618228',
              letterSpacing: 0,
            }}
          >
            {link.category}
          </span>
        )}
      </div>
      <ExternalLink
        className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
        style={{ color: 'var(--color-teal)' }}
        strokeWidth={2}
      />
    </a>
  )
}

export default function PageLinkCards({ links, defaultVisible = 4 }: PageLinkCardsProps) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = links.length > defaultVisible
  const visibleLinks = expanded ? links : links.slice(0, defaultVisible)

  if (links.length === 0) {
    return (
      <div className="text-center py-10 opacity-50">
        <p
          className="font-body text-sm"
          style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
        >
          Belum ada resource yang ditampilkan.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleLinks.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(1, 73, 75, 0.08)',
              color: 'var(--color-teal)',
              letterSpacing: 0,
            }}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" strokeWidth={2} />
                Sembunyikan
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" strokeWidth={2} />
                Lihat {links.length - defaultVisible} resource lainnya
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
