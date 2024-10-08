import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { IconRowContainer } from '../../../_blocks/IconRowContainer'
import { Gutter } from '../../../_components/Gutter'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

// Example data for IconRowContainer, possibly including multiple IconRows
const iconRowContainerData = {
  blockType: 'iconRowContainer' as 'iconRowContainer',
  blockName: 'Icon Row Container',
  introContent: [],
  mainHeading: 'Main Heading Example',
  rows: [
    {
      subheading: 'Subheading 1',
      icons: [
        {
          iconTitle: 'Icon 1',
          media: {
            url: '/path/to/icon1.jpg',
            alt: 'Icon 1',
            id: 0,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          },
        },
        {
          iconTitle: 'Icon 2',
          media: {
            url: '/path/to/icon2.jpg',
            alt: 'Icon 2',
            id: 1,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          },
        },
      ],
    },
  ],
}

export default function IconRowContainerStyleguide() {
  return (
    <Gutter>
      <VerticalPadding bottom="large" top="none">
        <h1>Icon Row Container Example</h1>
        <IconRowContainer {...iconRowContainerData} />
        <Link href="/styleguide">Back to Styleguide</Link>
      </VerticalPadding>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Icon Row Container Styleguide',
  description: 'Showcasing the Icon Row Container component.',
  openGraph: mergeOpenGraph({
    title: 'Icon Row Container Styleguide',
    url: '/styleguide/icon-row-container',
  }),
}
