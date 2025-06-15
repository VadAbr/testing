import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconCancel } from '@consta/icons/IconCancel'
import { IconNodeStart } from '@consta/icons/IconNodeStart'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Loader } from '@consta/uikit/Loader'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'

import { ShopApi } from '@entities/payment'
import { TestApi } from '@entities/test'
import { useUserInfo } from '@shared/store'

import styles from './styles.css'

type Props = {
  onSuccess: () => void
}

export const PaymentForm = ({ onSuccess }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isChecking, setIsChecking] = React.useState(false)
  const [isCancelFired, setSsCancelFired] = React.useState(false)

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
    setIsLoading(true)

    try {
      const data = await createInvoice().unwrap()

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
      <Text align="center" weight="semibold" size="2xl">
        {t('payment.title')}
      </Text>
      <Text align="center" size="l">
        {t('payment.description')}
      </Text>

      {isAdmin && (
        <div
          className={cnMixFlex({ align: 'center', gap: 'm', justify: 'center' }, [styles.testBtn])}>
          <Button label="Пройти тестирование без оплаты" loading={isLoading} onClick={createTest} />
        </div>
      )}

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
