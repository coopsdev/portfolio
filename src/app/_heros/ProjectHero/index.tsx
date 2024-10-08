import React, { Fragment } from 'react'

import { Project } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

import classes from './index.module.scss'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const {
    id,
    title,
    categories,
    hero: { links },
    layout,
    meta: { image: metaImage, description } = {},
    createdAt,
  } = project

  return (
    <Fragment>
      <Gutter className={classes.projectHero}>
        <div className={classes.content}>
          <div className={classes.leader}>
            <div className={classes.categories}>
              {createdAt && formatDateTime(createdAt)}
              &nbsp; &mdash; &nbsp;
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {titleToUse}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          </div>
          <h1 className={classes.title}>{title}</h1>
          {description && <p className={classes.description}>{description}</p>}
          <div className={'links'}>
            {Array.isArray(links) && (
              <ul className={classes.links}>
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink className={classes.link} {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={classes.media}>
          <div className={classes.mediaWrapper}>
            {!metaImage && <div className={classes.placeholder}>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName={classes.image} resource={metaImage} fill />
            )}
          </div>
          {metaImage &&
            typeof metaImage !== 'string' &&
            typeof metaImage !== 'number' &&
            metaImage?.caption && (
              <RichText content={metaImage.caption} className={classes.caption} />
            )}
        </div>
      </Gutter>
    </Fragment>
  )
}
