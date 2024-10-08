import type { Block } from 'payload/types'

import richText from '../../fields/richText'

export const IconRow: Block = {
  slug: 'iconRow',
  fields: [
    richText({
      name: 'introContent',
      label: 'Intro Content',
      required: false,
    }),
    {
      name: 'subheading',
      type: 'text',
      required: true,
    },
    {
      name: 'icons',
      type: 'array',
      fields: [
        {
          name: 'iconTitle',
          type: 'text',
          required: false,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
