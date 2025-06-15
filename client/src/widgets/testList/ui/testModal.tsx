import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconClose } from '@consta/icons/IconClose'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'
import { Modal } from '@consta/uikit/Modal'
import { Text } from '@consta/uikit/Text'

import type { GetAllTestsResponse } from '@entities/test'
import type { ArrayElement } from '@shared/types'

import { HelpBadge, StatusBadge } from './utils'

import styles from './styles.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  test?: ArrayElement<GetAllTestsResponse> | null
}

const formatted = new Intl.DateTimeFormat('ru-Ru', {
  dateStyle: 'medium',
  timeStyle: 'medium',
})

const categoryPath = 'testResults.problems.'
const stepPath = 'testResults.'

const pr = new Intl.PluralRules('ru', { type: 'cardinal' })
const forms = {
  zero: 'баллов',
  one: 'балл',
  few: 'балла',
  many: 'баллов',
  other: 'балла',
}

function pluralIntl(count: number) {
  const rule = pr.select(count)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return forms[rule] || forms.other
}

export const TestModal = ({ isOpen, test, onClose }: Props) => {
  const { t } = useTranslation()

  if (!test) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} onClickOutside={onClose}>
        <div className={styles.modalWrapper}>
          <div className={cnMixFlex({ align: 'center', justify: 'space-between', gap: 'xl' })}>
            <Text weight="semibold" size="xl" />

            <Button size="s" view="clear" onlyIcon={true} iconLeft={IconClose} onClick={onClose} />
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onClickOutside={onClose}>
      <div className={styles.modalWrapper}>
        <div className={cnMixFlex({ align: 'center', justify: 'space-between', gap: 'xl' })}>
          <Text weight="semibold" size="xl">
            Тест: {test.id}
          </Text>

          <Button size="s" view="clear" onlyIcon={true} iconLeft={IconClose} onClick={onClose} />
        </div>

        <div className={cnMixScrollBar()}>
          <Text weight="semibold" size="l">
            Основная информация:
          </Text>

          <div className={styles.mainInfo}>
            <Text>Пользователь: {test.user.name}</Text>
            <Text view="link">Почта: {test.user.email}</Text>
            <StatusBadge status={test.status} />
            <HelpBadge isAskedForHelp={test.isAskedForHelp ?? false} />
            <Text>Время: {formatted.format(new Date(test.createdAt))}</Text>
          </div>

          {test.result ? (
            <div className={styles.testResult}>
              <Text weight="semibold" size="l">
                Результат теста:
              </Text>

              {Object.entries(test.result).map(([step, stepRes]) => (
                <div key={step} style={{ marginBottom: '10px' }}>
                  <Text weight="semibold" as="strong">
                    Блок {t(`${stepPath}${step}`)}:
                  </Text>{' '}
                  {stepRes.totalScore} {pluralIntl(stepRes.totalScore)} (
                  {stepRes.isValid ? '✅' : '❌'})
                  <ul>
                    {stepRes.categories.map(cat => (
                      <li key={cat.category}>
                        -{t(`${categoryPath}${cat.category}`)}: {cat.totalScore}{' '}
                        {pluralIntl(cat.totalScore)} — {cat.isValid ? '✅' : '❌'}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <Text weight="semibold" size="xl">
              Нет результатов
            </Text>
          )}
        </div>
      </div>
    </Modal>
  )
}
