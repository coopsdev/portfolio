import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types.js'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { BabylonBlock, BabylonBlockProps } from '../../_blocks/BabylonBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { CommentsBlock, type CommentsBlockProps } from '../../_blocks/Comments/index'
import { ContentBlock } from '../../_blocks/Content'
import { IconRow, IconRowProps } from '../../_blocks/IconRow'
import { IconRowContainer, IconRowContainerProps } from '../../_blocks/IconRowContainer'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { ReferencesBlock } from '../../_blocks/References'
import { ReferenceBlockProps } from '../../_blocks/References/types'
import { RelatedPosts, type RelatedPostsProps } from '../../_blocks/RelatedPosts'
import { toKebabCase } from '../../_utilities/toKebabCase'
import { BackgroundColor } from '../BackgroundColor'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  iconRow: IconRow,
  iconRowContainer: IconRowContainer,
  babylonBlock: BabylonBlock,
  archive: ArchiveBlock,
  relatedPosts: RelatedPosts,
  comments: CommentsBlock,
  referencesBlock: ReferencesBlock,
}

export const Blocks: React.FC<{
  blocks: (
    | Page['layout'][0]
    | RelatedPostsProps
    | CommentsBlockProps
    | IconRowProps
    | IconRowContainerProps
    | BabylonBlockProps
    | ReferenceBlockProps
  )[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            // the cta block is containerized, so we don't consider it to be inverted at the block-level
            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta' ? block.invertBackground : false
            const prevBlock = blocks[index - 1]

            const prevBlockInverted =
              prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

            const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

            let paddingTop: VerticalPaddingOptions = 'large'
            let paddingBottom: VerticalPaddingOptions = 'large'

            if (prevBlock && isPrevSame) {
              paddingTop = 'none'
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }

            if (Block) {
              return (
                <BackgroundColor key={index} invert={blockIsInverted}>
                  <VerticalPadding top={paddingTop} bottom={paddingBottom}>
                    {/* @ts-expect-error lots of issues with this */}
                    <Block id={toKebabCase(blockName)} {...block} />
                  </VerticalPadding>
                </BackgroundColor>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
