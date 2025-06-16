import React from 'react'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'

import type { GetAllTestsResponse } from '@entities/test'
import type { ArrayElement } from '@shared/types'

import { HelpBadge, StatusBadge } from './utils'

import styles from './styles.css'

type Props = {
  item: ArrayElement<GetAllTestsResponse>
  selectedId?: string
  onClick: (id: string) => void
}

const formatted = new Intl.DateTimeFormat('ru-Ru', {
  dateStyle: 'medium',
  timeStyle: 'medium',
})

export const TestItem = ({ item, selectedId, onClick }: Props) => {
  return (
    <Card
      key={item.id}
      className={styles.card}
      form="round"
      style={{
        cursor: 'pointer',
        backgroundColor: item.id === selectedId ? '#eef' : 'transparent',
      }}
      onClick={() => {
        onClick(item.id)
      }}>
      <Text>Тест ID: {item.id}</Text>
      <Text>Пользователь: {item.user?.name ?? (item.userId || '-')}</Text>
      <StatusBadge status={item.status} />
      <HelpBadge isAskedForHelp={item.isAskedForHelp ?? false} />
      <Text>Время: {formatted.format(new Date(item.createdAt))}</Text>
    </Card>
  )
}
