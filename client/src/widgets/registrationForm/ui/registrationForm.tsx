import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IconBag } from '@consta/icons/IconBag'
import { IconLithologyStroked } from '@consta/icons/IconLithologyStroked'
import { IconMail } from '@consta/icons/IconMail'
import { IconRUO } from '@consta/icons/IconRUO'
import { IconTie } from '@consta/icons/IconTie'
import { IconUser } from '@consta/icons/IconUser'
import { IconWatchStroked } from '@consta/icons/IconWatchStroked'
import { Button } from '@consta/uikit/Button'
import { Checkbox } from '@consta/uikit/Checkbox'
import type { SelectItemDefault } from '@consta/uikit/Select'
import { Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'
import cn from 'classnames'

import { useAppDispatch } from '@shared/hooks'
import { RegistrationFormSlice } from '@widgets/registrationForm'

import { submitForm } from '../actions'

import styles from './styles.css'

const OPTIONS: SelectItemDefault[] = [
  {
    label: 'authorization.keyQuestionOptions.options1',
    id: 1,
  },
  {
    label: 'authorization.keyQuestionOptions.options2',
    id: 2,
  },
]

type Props = {
  onRegister?: () => void
}

export const RegistrationForm = ({ onRegister }: Props) => {
  const form = useSelector(RegistrationFormSlice.selectors.getForm)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = React.useState(false)

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true)
    e.preventDefault()
    dispatch(submitForm())
      .unwrap()
      .then(() => {
        onRegister?.()
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  const changeName = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ name: value ?? '' }))
  }

  const changeAge = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ age: parseInt(value ?? '', 10) }))
  }

  const changeActivityField = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ activityField: value ?? '' }))
  }

  const changeEducation = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ education: value ?? '' }))
  }

  const changeWorkExperience = (value: string | null) => {
    dispatch(
      RegistrationFormSlice.actions.changeField({ workExperience: parseInt(value ?? '', 10) }),
    )
  }

  const changePosition = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ position: value ?? '' }))
  }

  const changeEmail = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ email: value ?? '' }))
  }

  const changeKeyQuestion = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ keyQuestionField: value ?? '' }))
  }

  const changeCheckbox = () => () => {
    dispatch(RegistrationFormSlice.actions.changeField({ isChecked: !form.isChecked }))
  }

  const changePassword = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ password: value ?? '' }))
  }

  return (
    <div>
      <Text weight="semibold" size="3xl" align="center">
        {t('registration.title')}
      </Text>

      <form autoComplete="off" id="authorization" className={styles.form}>
        <div className={styles.row}>
          <TextField
            label={t('authorization.nameField')}
            disabled={isLoading}
            value={form.name}
            autoFocus={true}
            leftSide={IconUser}
            onChange={changeName}
          />

          <TextField
            autoComplete="new-password"
            disabled={isLoading}
            label={t('authorization.password')}
            value={form.password}
            type="password"
            onChange={changePassword}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('authorization.activityField')}
            disabled={isLoading}
            value={form.activityField}
            leftSide={IconLithologyStroked}
            onChange={changeActivityField}
          />
          <TextField
            label={t('authorization.educationField')}
            value={form.education}
            disabled={isLoading}
            leftSide={IconRUO}
            onChange={changeEducation}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('authorization.workExperienceField')}
            disabled={isLoading}
            type="number"
            value={String(form.workExperience)}
            leftSide={IconBag}
            onChange={changeWorkExperience}
          />

          <TextField
            label={t('authorization.ageField')}
            value={String(form.age)}
            disabled={isLoading}
            type="number"
            min={0}
            leftSide={IconWatchStroked}
            onChange={changeAge}
          />
        </div>

        <div className={styles.row}>
          <TextField
            disabled={isLoading}
            autoComplete="off"
            label={t('authorization.emailField')}
            value={form.email}
            leftSide={IconMail}
            onChange={changeEmail}
          />
          <Select
            label={t('authorization.keyQuestionField')}
            disabled={isLoading}
            items={OPTIONS}
            value={form.keyQuestionField}
            getItemLabel={item => t(item.label)}
            onChange={changeKeyQuestion}
          />
        </div>

        <TextField
          label={t('authorization.positionField')}
          disabled={isLoading}
          value={form.position}
          leftSide={IconTie}
          onChange={changePosition}
        />

        <div className={cn(styles.row, styles.footer)}>
          <Checkbox
            disabled={isLoading}
            style={{ display: 'flex' }}
            label={t('authorization.checkbox')}
            checked={form.isChecked}
            onChange={changeCheckbox()}
          />

          <Button
            type="submit"
            label={t('registration.submit')}
            loading={isLoading}
            disabled={!form.isChecked || isLoading}
            onClick={submit}
          />
        </div>
      </form>
    </div>
  )
}
