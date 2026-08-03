import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Links } from './collections/Links'
import { Categories } from './collections/Categories'
import { Organizers } from './collections/Organizers'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev',
    defaultFromName: process.env.RESEND_FROM_NAME || 'HMTL Admin',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // ─────────────────────────────────────────────
  // Admin Panel
  // ─────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— HMTL Admin',
      description: 'Content management for HMTL (Himpunan Mahasiswa Teknik Lingkungan ITB)',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ─────────────────────────────────────────────
  // Collections
  // ─────────────────────────────────────────────
  collections: [
    Media,
    Events,
    Links,
    Categories,
    Organizers,
    // Built-in Users collection
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Administration',
        description: 'Manage admin users who can access the CMS.',
      },
      access: {
        read: ({ req: { user } }) => !!user,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
        },
        {
          name: 'role',
          type: 'select',
          label: 'Role',
          options: [
            { label: 'Administrator', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Member', value: 'member' },
          ],
          defaultValue: 'editor',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Editor
  // ─────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ─────────────────────────────────────────────
  // Database — Neon PostgreSQL
  // ─────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NEON_DATABASE_URL,
    },
    push: true,
  }),

  // ─────────────────────────────────────────────
  // Vercel Blob Storage
  // ─────────────────────────────────────────────
  plugins: [
    vercelBlobStorage({
      enabled: true,
      // Disable client-side browser PUT uploads to avoid CORS/400 errors; use server-side upload
      clientUploads: false,
      collections: {
        media: {
          prefix: 'media',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  // ─────────────────────────────────────────────
  // TypeScript output
  // ─────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ─────────────────────────────────────────────
  // Secret
  // ─────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET || 'change-this-secret-in-env',

  // ─────────────────────────────────────────────
  // CORS & CSRF
  // ─────────────────────────────────────────────
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],

  // ─────────────────────────────────────────────
  // Globals (Site Settings)
  // ─────────────────────────────────────────────
  globals: [
    {
      slug: 'site-settings',
      label: 'Site Settings',
      admin: {
        group: 'Configuration',
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          label: 'Hero Title',
          defaultValue: 'Himpunan Mahasiswa Teknik Lingkungan ITB',
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          label: 'Hero Subtitle',
          defaultValue:
            'Efficiency · Transparency · Creativity · Dedicated',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Banner Image',
        },
        {
          name: 'aboutText',
          type: 'richText',
          label: 'About / Vision Text',
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Website', value: 'website' },
                { label: 'Email', value: 'email' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
            },
          ],
        },
      ],
    },
  ],
})
