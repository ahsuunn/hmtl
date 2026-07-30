import { CollectionConfig } from 'payload'

export const Organizers: CollectionConfig = {
  slug: 'organizers',
  labels: {
    singular: 'Organizer / Team',
    plural: 'Organizers / Teams',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'color', 'createdAt'],
    description: 'Manage HMTL departments, committees, and organizer teams.',
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
      label: 'Team / Organizer Name',
      required: true,
      unique: true,
    },
    {
      name: 'color',
      type: 'select',
      label: 'Team Badge Color',
      required: true,
      defaultValue: '#7CA134',
      options: [
        { label: 'Green (Akademik & Profesi)', value: '#7CA134' },
        { label: 'Teal (Pengabdian Masyarakat)', value: '#01494B' },
        { label: 'Slate (Media & Informasi)', value: '#7B99A8' },
        { label: 'Forest Dark (BPH)', value: '#0F330A' },
        { label: 'Gold (Kewirausahaan / Creative)', value: '#D97706' },
        { label: 'Crimson (ENVMovement / Special)', value: '#DC2626' },
      ],
      admin: {
        description: 'Preset brand color used for calendar dots and team badges.',
      },
    },
    {
      name: 'customColor',
      type: 'text',
      label: 'Custom Hex Color (Optional)',
      admin: {
        description: 'Override preset with any custom hex color code (e.g. #10B981, #8B5CF6, #EC4899).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief summary of what this department or team does.',
      },
    },
  ],
  timestamps: true,
}
