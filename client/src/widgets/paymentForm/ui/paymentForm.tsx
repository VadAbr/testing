import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconCancel } from '@consta/icons/IconCancel'
import { IconNodeStart } from '@consta/icons/IconNodeStart'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Loader } from '@consta/uikit/Loader'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import type { SelectItemDefault } from '@consta/uikit/Select'
import { Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'

import type { PaymentMethod } from '@entities/payment'
import { ShopApi } from '@entities/payment'
import { TestApi } from '@entities/test'
import { useUserInfo } from '@shared/store'

import styles from './styles.css'

const PAYMENTS: SelectItemDefault[] = [
  { id: 'yukassa', label: 'ruCard' },
  { id: 'crypto', label: 'crypto' },
]

type Props = {
  onSuccess: () => void
}

export const PaymentForm = ({ onSuccess }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isChecking, setIsChecking] = React.useState(false)
  const [isCancelFired, setSsCancelFired] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<SelectItemDefault | null>(
    PAYMENTS[0],
  )

  const [createInvoice, { data }] = ShopApi.useCreateInvoiceMutation()
  const [cancelInvoice, { isLoading: isCanceling }] = ShopApi.useCancelInvoiceMutation()
  const [checkInvoice] = ShopApi.useCheckInvoiceMutation()
  const [createFreeTest] = TestApi.useCreateFreeTestMutation()

  const {
    isFetching: isGetting,
    data: currentPayment,
    isError,
  } = ShopApi.useGetLastPaymentQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { isAdmin } = useUserInfo()

  const timer = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    if (currentPayment?.paymentMethod) {
      const paymentOption = PAYMENTS.find(payment => payment.id === currentPayment.paymentMethod)
      if (paymentOption) {
        setSelectedPayment(paymentOption)
      }
    }
  }, [currentPayment])

  const continuePayment = () => {
    if (currentPayment) {
      startChecking(currentPayment.id)
      window.open(currentPayment.link)
    }
  }

  const startChecking = (id?: string) => {
    if (!id) {
      return
    }

    setIsChecking(true)
    checkInvoice(id)
      .unwrap()
      .then(data => {
        if (data.status === 'success') {
          setIsChecking(true)
          setIsLoading(false)
          onSuccess()
          return
        }

        timer.current = setTimeout(() => {
          startChecking(id)
        }, 2000)
      })
      .catch((e: unknown) => {
        console.error(e)
        setIsLoading(false)
        setIsChecking(false)
      })
  }

  const pay = async () => {
    if (!selectedPayment) return

    setIsLoading(true)

    try {
      const data = await createInvoice({
        paymentMethod: selectedPayment.id as PaymentMethod,
        returnUrl: window.location.href,
      }).unwrap()

      startChecking(data.id)
      window.open(data.link)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const createTest = () => {
    setIsLoading(true)
    createFreeTest()
      .unwrap()
      .then(() => {
        onSuccess()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const cancel = () => {
    const id = data?.id || currentPayment?.id
    if (id) {
      clearTimeout(timer.current)
      cancelInvoice(id)
        .unwrap()
        .then(() => {
          setIsLoading(false)
          setIsChecking(false)
          setSsCancelFired(true)
        })
        .catch(console.error)
    }
  }

  if (isGetting) {
    return (
      <Card className={styles.container} form="round">
        <Text align="center" weight="semibold" size="2xl">
          {t('payment.title')}
        </Text>

        <div style={{ height: 200 }}>
          <Loader className="loaderFullContent" />
        </div>
      </Card>
    )
  }

  return (
    <Card className={styles.container} form="round">
      <Text align="center" weight="semibold" size="2xl" style={{ marginBottom: '1rem' }}>
        {t('payment.title')}
      </Text>

      <Text align="center" weight="medium" size="l" style={{ marginBottom: '2rem' }}>
        {t('payment.text')}
      </Text>

      <Select
        disabled={isChecking}
        label={t('payment.paymentLabel')}
        getItemLabel={item => t(`payment.payments.${item.label}`)}
        value={selectedPayment}
        items={PAYMENTS}
        onChange={setSelectedPayment}
      />

      <div className={styles.price}>
        <Text weight="semibold" align="center" size="2xl">
          {t('payment.price')}
        </Text>
        <Text weight="medium" view="link" align="center" size="2xl">
          {t('payment.testPrice')}
        </Text>
      </div>

      {isAdmin && (
        <div
          className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, [styles.testBtn])}>
          <Button label="Пройти тестирование без оплаты" loading={isLoading} onClick={createTest} />
        </div>
      )}

      <Text align="center" size="m">
        {t('payment.description')}
      </Text>

      {currentPayment && !isChecking && !isError && !isCancelFired ? (
        <>
          <Text>{t('payment.oldPayment')}</Text>
          <div
            className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, [
              styles.payBtn,
            ])}>
            <Button
              iconLeft={IconCancel}
              label={t('payment.cancelBtn')}
              view="secondary"
              loading={isCanceling}
              onClick={cancel}
            />

            <Button
              iconLeft={IconNodeStart}
              label={t('payment.payBtn')}
              loading={isLoading}
              onClick={continuePayment}
            />
          </div>
        </>
      ) : (
        <div
          className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, [styles.payBtn])}>
          {isChecking && (
            <Button
              iconLeft={IconCancel}
              label={t('payment.cancelBtn')}
              view="secondary"
              loading={isCanceling}
              onClick={cancel}
            />
          )}
          {!isChecking && (
            <Button
              disabled={!selectedPayment}
              iconLeft={IconNodeStart}
              label={t('payment.payBtn')}
              loading={isLoading}
              onClick={() => {
                pay()
              }}
            />
          )}
        </div>
      )}
    </Card>
  )
}
