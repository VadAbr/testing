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
    label: 'registrationForm.keyQuestionOptions.options1',
    id: 1,
  },
  {
    label: 'registrationForm.keyQuestionOptions.options2',
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
        {t('registrationForm.title')}
      </Text>

      <form autoComplete="off" id="registrationForm" className={styles.form}>
        <div className={styles.row}>
          <TextField
            label={t('registrationForm.nameField')}
            disabled={isLoading}
            value={form.name}
            autoFocus={true}
            leftSide={IconUser}
            onChange={changeName}
          />

          <TextField
            autoComplete="new-password"
            disabled={isLoading}
            label={t('registrationForm.password')}
            value={form.password}
            type="password"
            onChange={changePassword}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('registrationForm.activityField')}
            disabled={isLoading}
            value={form.activityField}
            leftSide={IconLithologyStroked}
            onChange={changeActivityField}
          />
          <TextField
            label={t('registrationForm.educationField')}
            value={form.education}
            disabled={isLoading}
            leftSide={IconRUO}
            onChange={changeEducation}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('registrationForm.workExperienceField')}
            disabled={isLoading}
            value={String(form.workExperience)}
            leftSide={IconBag}
            onChange={changeWorkExperience}
          />

          <TextField
            label={t('registrationForm.ageField')}
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
            label={t('registrationForm.emailField')}
            value={form.email}
            leftSide={IconMail}
            onChange={changeEmail}
          />
          <Select
            label={t('registrationForm.keyQuestionField')}
            disabled={isLoading}
            items={OPTIONS}
            value={form.keyQuestionField}
            getItemLabel={item => t(item.label)}
            onChange={changeKeyQuestion}
          />
        </div>

        <TextField
          label={t('registrationForm.positionField')}
          disabled={isLoading}
          value={form.position}
          leftSide={IconTie}
          onChange={changePosition}
        />

        <div className={cn(styles.row, styles.footer)}>
          <Checkbox
            disabled={isLoading}
            style={{ display: 'flex' }}
            label={t('registrationForm.checkbox')}
            checked={form.isChecked}
            onChange={changeCheckbox()}
          />

          <Button
            type="submit"
            label={t('registrationForm.register')}
            loading={isLoading}
            disabled={!form.isChecked || isLoading}
            onClick={submit}
          />
        </div>
      </form>
    </div>
  )
}
