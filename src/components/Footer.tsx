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
      className="border-t"
      style={{
        borderColor: 'rgba(247, 244, 213, 0.1)',
        background: 'var(--color-forest)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-heading text-lg font-bold" style={{ color: 'var(--color-cream)', letterSpacing: 0 }}>
            HMTL ITB
          </span>
          <span className="hidden sm:inline opacity-30" style={{ color: 'var(--color-cream)' }}>•</span>
          <p className="font-body text-xs opacity-60" style={{ color: 'var(--color-cream)', letterSpacing: 0 }}>
            © {new Date().getFullYear()} Himpunan Mahasiswa Teknik Lingkungan ITB. All rights reserved.
          </p>
        </div>

        {/* Right: Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform hover:scale-110"
                style={{ background: 'rgba(247, 244, 213, 0.12)', color: 'var(--color-cream)' }}
                aria-label={s.platform}
              >
                {socialIcons[s.platform] || '🔗'}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
