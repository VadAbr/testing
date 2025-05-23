import React from 'react'
import { useTranslation } from 'react-i18next'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'

type TitleProps = {
  number: number
  text: string
  htmlFor: string
}

const Title = ({ number, text, htmlFor }: TitleProps) => {
  const { t } = useTranslation()

  return (
    <Text size="l" className="m-b-xs" as="label" htmlFor={htmlFor}>
      <Text weight="medium" as="span">
        {number}.&nbsp;
      </Text>
      <Text as="span">{t(text)}</Text>
    </Text>
  )
}

type QuestionProps = {
  children?: React.ReactNode
} & TitleProps

export const Question = ({ children, ...titleProps }: QuestionProps) => {
  return (
    <div className={cnMixFlex({ direction: 'column' })}>
      <Title {...titleProps} />

      {children}
    </div>
  )
}
