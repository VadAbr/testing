import React, { useMemo, useState } from 'react'
import { IconDown } from '@consta/icons/IconDown'
import { IconTop } from '@consta/icons/IconTop'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'
import { ResponsesEmptyBox } from '@consta/uikit/ResponsesEmptyBox'
import type { SelectItemDefault } from '@consta/uikit/Select'
import { Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'

import type { GetAllTestsResponse } from '@entities/test'

import { TestItem } from './testItem'
import { TestModal } from './testModal'

type Props = {
  tests: GetAllTestsResponse
}

const STATUSES: SelectItemDefault[] = [
  {
    id: 'all',
    label: 'Все статусы',
  },
  {
    id: 'pending',
    label: 'В ожидании прохождения',
  },
  {
    id: 'success',
    label: 'Пройден',
  },
]

const HELP_REQUESTED: SelectItemDefault[] = [
  {
    id: 'all',
    label: 'Все статусы',
  },
  {
    id: 'yes',
    label: 'Да',
  },
  {
    id: 'no',
    label: 'Нет',
  },
]

export const TestList = ({ tests }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filterUser, setFilterUser] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<SelectItemDefault>(STATUSES[0])
  const [filterHelp, setFilterHelp] = useState<SelectItemDefault>(HELP_REQUESTED[0])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredTests = useMemo(() => {
    const filtered = tests.filter(test => {
      if (filterUser && !test.user.name.toLowerCase().includes(filterUser.toLowerCase())) {
        return false
      }
      if (filterStatus.id !== 'all' && test.status !== filterStatus.id) return false
      if (filterHelp.id !== 'all') {
        const wantsHelp = Boolean(test.isAskedForHelp)
        if ((filterHelp.id === 'yes' && !wantsHelp) || (filterHelp.id === 'no' && wantsHelp)) {
          return false
        }
      }
      return true
    })

    return [...filtered].sort((aTest, bTest) => {
      const diff = new Date(aTest.createdAt).getTime() - new Date(bTest.createdAt).getTime()
      return sortOrder === 'asc' ? diff : -diff
    })
  }, [tests, filterUser, filterStatus, filterHelp, sortOrder])

  const selectedTest = selectedId ? tests.find(test => test.id === selectedId) : null

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }
  console.log(tests)
  console.log(filteredTests)

  if (tests.length === 0) {
    return (
      <div className={cnMixFlex({ align: 'center', justify: 'center' })} style={{ height: '100%' }}>
        <ResponsesEmptyBox title="Список тестов отсутвует" description=" " actions={<div />} />
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexDirection: 'column', padding: '2rem 0' }}>
        <Text weight="medium" size="xl">
          Фильтры
        </Text>

        <div className={cnMixFlex({ align: 'flex-end', gap: '2xl' })}>
          <TextField
            label="Пользователь"
            value={filterUser}
            onChange={value => {
              setFilterUser(value ?? '')
            }}
          />

          <Select
            label="Статус теста"
            items={STATUSES}
            value={filterStatus}
            onChange={item => {
              setFilterStatus(item ?? STATUSES[0])
            }}
          />
          <Select
            label="Запрос о помощи"
            items={HELP_REQUESTED}
            value={filterHelp}
            onChange={item => {
              setFilterHelp(item ?? HELP_REQUESTED[0])
            }}
          />

          <Button
            iconLeft={sortOrder === 'asc' ? IconDown : IconTop}
            label={sortOrder === 'asc' ? 'Старые' : 'Новые'}
            onClick={toggleSort}
          />
        </div>

        <Text weight="medium" size="xl">
          Тесты
        </Text>
        <ul className={cnMixScrollBar()}>
          {filteredTests.map(test => (
            <TestItem
              key={test.id}
              item={test}
              selectedId={selectedId ?? undefined}
              onClick={setSelectedId}
            />
          ))}
        </ul>
      </div>

      <TestModal
        isOpen={Boolean(selectedId)}
        test={selectedTest}
        onClose={() => {
          setSelectedId(null)
        }}
      />
    </>
  )
}
