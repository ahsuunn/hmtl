import Link from 'next/link'

const socialIcons: Record<string, string> = {
  instagram: '📸',
  twitter: '🐦',
  youtube: '▶️',
  linkedin: '💼',
  tiktok: '🎵',
  website: '🌐',
  email: '✉️',
}

interface FooterProps {
  socialLinks?: { platform: string; url: string }[]
}

export default function Footer({ socialLinks = [] }: FooterProps) {
  return (
    <footer
      className="mt-24 border-t"
      style={{
        borderColor: 'rgba(15, 51, 10, 0.1)',
        background: 'var(--color-forest)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                style={{ background: 'var(--color-teal)', color: 'var(--color-cream)' }}
              >
                HM
              </div>
              <div>
                <p className="font-heading text-xl font-bold" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
                  HMTL
                </p>
                <p className="font-body text-xs opacity-60" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
                  Himpunan Mahasiswa Teknik Lingkungan
                </p>
              </div>
            </div>
            <p className="font-body text-sm opacity-70 max-w-xs" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
              Efficiency · Transparency · Creativity · Dedicated
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/events', label: 'Events' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/resources', label: 'Resource Center' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div>
              <h3 className="font-heading text-base font-semibold mb-4" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110"
                    style={{ background: 'rgba(247, 244, 213, 0.12)', color: 'var(--color-cream)' }}
                    aria-label={s.platform}
                  >
                    {socialIcons[s.platform] || '🔗'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(247, 244, 213, 0.1)' }}
        >
          <p className="font-body text-xs opacity-40" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
            © {new Date().getFullYear()} HMTL — Himpunan Mahasiswa Teknik Lingkungan. All rights reserved.
          </p>
          <p className="font-body text-xs opacity-40" style={{ color: 'var(--color-cream)', fontStyle: 'italic', letterSpacing: 0 }}>
            Built with Payload CMS & Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
