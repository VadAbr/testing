import React from 'react'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'
import cn from 'classnames'

import styles from './styles.css'

type Props = {
  children: React.ReactNode
  className?: string
}

const scrollBarStyles = cnMixScrollBar()

export const PageContent = ({ children, className }: Props) => {
  return (
    <div className={cn(styles.pageContent, scrollBarStyles, className)}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  )
}
