import React from 'react'
import type { BadgePropStatus } from '@consta/uikit/Badge'
import { Badge } from '@consta/uikit/Badge'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'

export const StatusBadge = ({ status }: { status: 'pending' | 'success' }) => {
  const TEXT = {
    pending: 'В ожидании прохождения',
    success: 'Пройден',
  }

  const STATUS = {
    pending: 'normal',
    success: 'success',
  }
  return (
    <div className={cnMixFlex({ align: 'center', gap: 's' })}>
      <Text>Статус теста:</Text>
      <Badge
        style={{ display: 'inline-block' }}
        status={STATUS[status] as BadgePropStatus}
        label={TEXT[status]}
      />
    </div>
  )
}

export const HelpBadge = ({ isAskedForHelp }: { isAskedForHelp: boolean }) => {
  const text = isAskedForHelp ? 'Да' : 'Нет'
  const status = isAskedForHelp ? 'normal' : 'error'

  return (
    <div className={cnMixFlex({ align: 'center', gap: 's' })}>
      <Text>Запрошена помощь:</Text>
      <Badge style={{ display: 'inline-block' }} view="stroked" status={status} label={text} />
    </div>
  )
}
