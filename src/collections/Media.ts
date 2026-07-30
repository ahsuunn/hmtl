import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Upload photos, posters, and images for the gallery and other sections.',
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'poster',
        width: 600,
        height: 800,
        position: 'centre',
      },
      {
        name: 'banner',
        width: 1600,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured (show in bento grid / home page)',
      defaultValue: false,
    },
    {
      name: 'isHero',
      type: 'checkbox',
      label: 'Use as Hero Banner',
      defaultValue: false,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'ENVMovement', value: 'envmovement' },
        { label: 'Banner / Slider', value: 'banner' },
        { label: 'Poster / Pamphlet', value: 'poster' },
        { label: 'Events', value: 'events' },
        { label: 'Organization', value: 'organization' },
        { label: 'Environment', value: 'environment' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Redirect URL / Target Link',
      admin: {
        description: 'Optional URL to open when users click on this image (e.g. https://... or /resources).',
      },
    },
  ],
}
