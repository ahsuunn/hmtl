import Link from 'next/link'
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
} from 'lucide-react'

interface ResourceLink {
  id: string
  title: string
  url: string
  description?: string
  category: string
  icon?: string
}

interface ResourceLinksProps {
  links: ResourceLink[]
  preview?: boolean
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

export default function ResourceLinks({ links, preview = false }: ResourceLinksProps) {
  return (
    <div>
      {/* Group by category for full page, flat list for preview */}
      {preview ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <ResourceCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <ResourcesByCategory links={links} />
      )}

      {preview && (
        <div className="mt-8 flex justify-center">
          <Link href="/resources" className="btn-primary">
            Lihat Semua Resources →
          </Link>
        </div>
      )}
    </div>
  )
}

function ResourceCard({ link }: { link: ResourceLink }) {
  const IconComponent = iconComponentMap[link.icon || 'link'] || Globe

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-5 flex gap-4 items-start group cursor-pointer block"
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
          style={{
            color: 'var(--color-forest)',
            letterSpacing: 0,
          }}
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

function ResourcesByCategory({ links }: { links: ResourceLink[] }) {
  const groups = links.reduce<Record<string, ResourceLink[]>>((acc, link) => {
    const cat = link.category || 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(link)
    return acc
  }, {})

  return (
    <div className="space-y-12">
      {Object.entries(groups).map(([category, catLinks]) => (
        <div key={category}>
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="font-heading text-2xl font-bold"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              {category}
            </h2>
            <span
              className="font-body text-sm px-2 py-0.5 rounded-xs"
              style={{
                background: 'rgba(1, 73, 75, 0.1)',
                color: 'var(--color-teal)',
                letterSpacing: 0,
              }}
            >
              {catLinks.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catLinks.map((link) => (
              <ResourceCard key={link.id} link={link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
