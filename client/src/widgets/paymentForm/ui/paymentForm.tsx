import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconCancel } from '@consta/icons/IconCancel'
import { IconNodeStart } from '@consta/icons/IconNodeStart'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'

import { ShopApi } from '@app/entities/payment/api'

import styles from './styles.css'

type Props = {
  onSuccess: () => void
}

export const PaymentForm = ({ onSuccess }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [createInvoice, { data }] = ShopApi.useCreateInvoiceMutation()
  const [cancelInvoice, { isLoading: isCanceling }] = ShopApi.useCancelInvoiceMutation()
  const [checkInvoice] = ShopApi.useCheckInvoiceMutation()

  const timer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const pay = async () => {
    setIsLoading(true)

    const startChecking = (id?: string) => {
      if (!id) {
        return
      }

      checkInvoice(id)
        .unwrap()
        .then(data => {
          if (data.result[0].invoice_status === 'success') {
            setIsLoading(false)
            onSuccess()
            return
          }

          timer.current = setTimeout(() => {
            startChecking(id)
          }, 2000)
        })
    }

    try {
      const data = await createInvoice().unwrap()

      if (data.status !== 'success') {
        return
      }

      startChecking(data.result.uuid)
      window.open(data.result.link)
    } catch (e) {
      console.error(e)
    }
  }

  const cancel = () => {
    if (data?.result.uuid) {
      clearTimeout(timer.current)
      cancelInvoice(data.result.uuid)
        .unwrap()
        .then(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <Card className={styles.container} form="round">
      <Text align="center" weight="semibold" size="2xl">
        {t('payment.title')}
      </Text>
      <Text align="center" size="l">
        {t('payment.description')}
      </Text>

      <div className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, styles.testBtn)}>
        <Button label="Пройти тестирование без оплаты" onClick={onSuccess} />
      </div>

      <div className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, styles.payBtn)}>
        {isLoading && (
          <Button
            iconLeft={IconCancel}
            label={t('payment.cancelBtn')}
            view="secondary"
            loading={isCanceling}
            onClick={cancel}
          />
        )}
        <Button
          iconLeft={IconNodeStart}
          label={t('payment.payBtn')}
          loading={isLoading}
          onClick={() => {
            pay()
          }}
        />
      </div>
    </Card>
  )
}
