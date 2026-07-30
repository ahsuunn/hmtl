import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  imageUrl?: string
  imageAlt?: string
}

export default function Hero({ title, subtitle, imageUrl, imageAlt }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image or gradient */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt || 'Hero banner'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0F330A 0%, #01494B 40%, #7CA134 100%)',
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: imageUrl
            ? 'linear-gradient(to right, rgba(15,51,10,0.85) 0%, rgba(1,73,75,0.6) 60%, transparent 100%)'
            : 'linear-gradient(to right, rgba(15,51,10,0.5) 0%, transparent 100%)',
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'var(--color-cream)' }}
      />
      <div
        className="absolute bottom-16 right-1/4 w-64 h-64 rounded-full opacity-5"
        style={{ background: 'var(--color-green)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Title */}
          <h1
            className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-xl md:text-2xl mb-10 opacity-80 leading-relaxed"
            style={{ color: 'var(--color-cream)', letterSpacing: 0 }}
          >
            {subtitle}
          </p>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <svg
          className="w-6 h-6 opacity-60"
          fill="none"
          stroke="var(--color-cream)"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
