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
import { Card } from '@consta/uikit/Card'
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

export const RegistrationForm = () => {
  const form = useSelector(RegistrationFormSlice.selectors.getForm)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const startTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(submitForm())
  }

  const changeName = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ name: value ?? '' }))
  }

  const changeAge = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ age: value ?? '' }))
  }

  const changeActivityField = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ activityField: value ?? '' }))
  }

  const changeEducation = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ education: value ?? '' }))
  }

  const changeWorkExperience = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ workExperience: value ?? '' }))
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

  return (
    <Card className={styles.container} form="round">
      <Text weight="semibold" size="3xl" align="center">
        {t('registrationForm.title')}
      </Text>

      <form id="registrationForm" className={styles.form}>
        <div className={styles.row}>
          <TextField
            label={t('registrationForm.nameField')}
            value={form.name}
            autoFocus={true}
            leftSide={IconUser}
            onChange={changeName}
          />
          <TextField
            label={t('registrationForm.ageField')}
            value={form.age}
            type="number"
            min={0}
            leftSide={IconWatchStroked}
            onChange={changeAge}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('registrationForm.activityField')}
            value={form.activityField}
            leftSide={IconLithologyStroked}
            onChange={changeActivityField}
          />
          <TextField
            label={t('registrationForm.educationField')}
            value={form.education}
            leftSide={IconRUO}
            onChange={changeEducation}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('registrationForm.workExperienceField')}
            value={form.workExperience}
            leftSide={IconBag}
            onChange={changeWorkExperience}
          />
          <TextField
            label={t('registrationForm.positionField')}
            value={form.position}
            leftSide={IconTie}
            onChange={changePosition}
          />
        </div>

        <div className={styles.row}>
          <TextField
            label={t('registrationForm.emailField')}
            value={form.email}
            leftSide={IconMail}
            onChange={changeEmail}
          />
          <Select
            label={t('registrationForm.keyQuestionField')}
            items={OPTIONS}
            value={form.keyQuestionField}
            getItemLabel={item => t(item.label)}
            onChange={changeKeyQuestion}
          />
        </div>

        <div className={cn(styles.row, styles.footer)}>
          <Checkbox
            style={{ display: 'flex' }}
            label={t('registrationForm.checkbox')}
            checked={form.isChecked}
            onChange={changeCheckbox()}
          />

          <Button
            type="submit"
            label={t('registrationForm.startTest')}
            disabled={!form.isChecked}
            onClick={startTest}
          />
        </div>
      </form>
    </Card>
  )
}
