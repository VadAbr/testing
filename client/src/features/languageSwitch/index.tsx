import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconWorldStroked } from '@consta/icons/IconWorldStroked'
import { Button } from '@consta/uikit/Button'
import { ContextMenu } from '@consta/uikit/ContextMenu'

import { STORAGE_KEYS } from '@shared/constants'
import { De, Es, Fr, It, Ru, Us } from '@shared/ui'

type LangItem = {
  code: 'en' | 'fr' | 'de' | 'es' | 'it' | 'ru'
  label: string
  flag: React.ReactNode
}

const LANG_ITEMS: LangItem[] = [
  {
    code: 'en',
    label: 'English',
    flag: <Us />,
  },
  {
    code: 'fr',
    label: 'Français',
    flag: <Fr />,
  },
  {
    code: 'de',
    label: 'Deutsch',
    flag: <De />,
  },
  {
    code: 'es',
    label: 'Español',
    flag: <Es />,
  },
  {
    code: 'it',
    label: 'Italiano',
    flag: <It />,
  },
  {
    code: 'ru',
    label: 'Русский',
    flag: <Ru />,
  },
]

export const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { i18n } = useTranslation()

  const onItemClick = (item: LangItem) => {
    i18n.changeLanguage(item.code).then(() => {
      localStorage.setItem(STORAGE_KEYS.locale, item.code)
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        ref={btnRef}
        view="clear"
        form="round"
        onlyIcon={true}
        iconLeft={() => <IconWorldStroked view="link" />}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
      <ContextMenu
        style={{ width: 130 }}
        items={LANG_ITEMS}
        getItemLabel={item => item.label}
        getItemLeftSide={item => item.flag}
        isOpen={isOpen}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        anchorRef={btnRef}
        direction="downStartLeft"
        onItemClick={onItemClick}
        onClickOutside={() => {
          setIsOpen(false)
        }}
      />
    </>
  )
}
