import { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  labels: {
    singular: 'Link',
    plural: 'Links',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublic', 'createdAt'],
    description: 'Manage resource links, references, and useful URLs for members.',
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public users can only see public links
      if (!user) return { isPublic: { equals: true } }
      return true
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: true,
      validate: (val: string | null | undefined) => {
        if (!val) return 'URL is required'
        try {
          new URL(val)
          return true
        } catch {
          return 'Must be a valid URL (include https://)'
        }
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of what this link is about.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      required: true,
      admin: {
        description: 'Select or create a category for this link.',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Publicly Visible',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Public links appear on the public Resource Center page.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured on Home Page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured links appear in the homepage resource snippet.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      admin: {
        description: 'Visual icon representing this link.',
      },
      options: [
        { label: '📄 Document', value: 'document' },
        { label: '🔗 Link', value: 'link' },
        { label: '📊 Data / Spreadsheet', value: 'data' },
        { label: '📚 Book / Study', value: 'book' },
        { label: '🌿 Environment', value: 'environment' },
        { label: '⚙️ Tool', value: 'tool' },
        { label: '📱 Social Media', value: 'social' },
        { label: '🏛️ Official', value: 'official' },
      ],
      defaultValue: 'link',
    },
  ],
  timestamps: true,
}

