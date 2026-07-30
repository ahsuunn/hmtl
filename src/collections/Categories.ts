import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'createdAt'],
    description: 'Manage link categories for the Resource Center.',
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Category Name',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional brief summary of what belongs in this category.',
      },
    },
  ],
  timestamps: true,
}
