# HMTL — Himpunan Mahasiswa Teknik Lingkungan

Official website for HMTL built with Next.js 15 (App Router), Payload CMS v3, Neon PostgreSQL, and Cloudflare R2.

**Motto:** *Efficiency · Transparency · Creativity · Dedicated*

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| CMS | Payload CMS v3 |
| Database | Neon (PostgreSQL via `@payloadcms/db-postgres`) |
| Object Storage | Cloudflare R2 (via `@payloadcms/storage-s3`) |
| Styling | Tailwind CSS v3 |
| Package Manager | pnpm |

---

## Setup

### 1. Clone & Install

```bash
git clone <repo>
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Required variables:**

| Variable | Description |
|---|---|
| `NEON_DATABASE_URL` | Neon PostgreSQL connection string |
| `PAYLOAD_SECRET` | Random 32+ character secret for Payload |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 Access Key ID |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 Secret Access Key |
| `R2_BUCKET` | R2 bucket name (e.g. `hmtl-media`) |
| `R2_ENDPOINT` | R2 S3-compatible endpoint URL |
| `R2_PUBLIC_URL` | Public URL for accessing uploaded files |
| `NEXT_PUBLIC_SERVER_URL` | Full URL of your deployment |

### 3. Cloudflare R2 Setup

1. Go to **Cloudflare Dashboard → R2 → Create Bucket** named `hmtl-media`
2. Enable **Public Access** on the bucket (or use a custom domain)
3. Create an **R2 API Token** with Object Read & Write permissions
4. Copy the endpoint URL from bucket settings (format: `https://<account-id>.r2.cloudflarestorage.com`)

### 4. Neon Database Setup

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the **connection string** (include `?sslmode=require`)
3. Payload will auto-create all tables on first run

### 5. Run Development Server

```bash
pnpm dev
```

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing pages
│   │   ├── page.tsx         # Home — hero, events, bento, resources
│   │   ├── events/page.tsx  # Full event timeline
│   │   ├── gallery/page.tsx # Photo gallery
│   │   ├── resources/page.tsx # Resource center
│   │   └── layout.tsx       # Navbar + Footer wrapper
│   ├── (payload)/           # Payload CMS admin & API
│   │   ├── admin/           # Admin panel route
│   │   └── api/             # REST API routes
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   └── globals.css          # Design system & global styles
├── collections/
│   ├── Media.ts             # Media collection (R2 uploads)
│   ├── Events.ts            # Events collection
│   └── Links.ts             # Resource links collection
├── components/
│   ├── Navbar.tsx           # Glassmorphism sticky nav
│   ├── Footer.tsx           # Dark footer with social links
│   ├── Hero.tsx             # Full-height hero with CMS image
│   ├── EventTimeline.tsx    # Vertical timeline with status badges
│   ├── BentoGrid.tsx        # Featured media bento layout
│   ├── ResourceLinks.tsx    # Link cards grouped by category
│   └── GalleryGrid.tsx      # Masonry gallery with lightbox
├── lib/
│   └── payload.ts           # Memoised Local API getter
├── payload.config.ts        # Payload CMS configuration
└── middleware.ts            # Admin redirect middleware
```

---

## CMS Collections

### Media
- Upload images to Cloudflare R2
- Auto-generates `thumbnail` (400×300), `card` (800×600), `hero` (1600×900) sizes
- Fields: `alt`, `caption`, `isFeatured` (bento grid), `isHero`, `category`

### Events
- Rich timeline of organization events
- Fields: `title`, `slug`, `description` (richtext), `shortDescription`, `date`, `endDate`, `location`, `status`, `cover`, `tags`, `registrationUrl`
- Status: `upcoming` | `ongoing` | `completed` | `cancelled`

### Links (Resource Center)
- Public/private resource links with access control
- Fields: `title`, `url`, `description`, `category`, `isPublic`, `isFeatured`, `icon`
- Categories: Academic, Documents, Tools, Environment, Regulations, Events, Social, Other

### Users
- CMS users with roles: `admin` | `editor` | `member`

### Site Settings (Global)
- `heroTitle`, `heroSubtitle`, `heroImage`
- `aboutText` (richtext)
- `socialLinks` (array of platform + url)

---

## Design System

| Token | Value |
|---|---|
| Background | `#F7F4D5` (Cream) |
| Primary Text | `#0F330A` (Forest) |
| Accent Green | `#7CA134` |
| Accent Slate | `#7B99A8` |
| Accent Teal | `#01494B` |
| Heading Font | Playfair Display (italic) |
| Body Font | Crimson Pro (italic) |
| Letter Spacing | 0 on all elements |

---

## Deploy

### Vercel (Recommended)

```bash
pnpm build
vercel --prod
```

Set all environment variables in Vercel project settings.

### Environment Variables Needed in Production

Same as `.env.example` — set `NEXT_PUBLIC_SERVER_URL` to your production URL.