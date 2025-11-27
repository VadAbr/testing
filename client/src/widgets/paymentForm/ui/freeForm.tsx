import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import { Card } from "@consta/uikit/Card";
import { cnMixFlex } from "@consta/uikit/MixFlex";
import { Text } from "@consta/uikit/Text";

import { TestApi } from "@entities/test";

import styles from "./styles.css";

type Props = {
  onSuccess: () => void
}

export const FreeForm = ({ onSuccess }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [createFreeTest] = TestApi.useCreateFreeTestMutation();
  const { t } = useTranslation();

  const createTest = () => {
    setIsLoading(true);
    createFreeTest()
      .unwrap()
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card className={styles.container} form="round">
      <Text align="center" weight="semibold" size="2xl" style={{ marginBottom: "1rem" }}>
        {t("payment.title")}
      </Text>

      <Text align="center" weight="medium" size="l" style={{ marginBottom: "2rem" }}>
        {t("payment.text")}
      </Text>

      <div className={styles.price}>
        <Text weight="semibold" align="center" size="2xl">
          {t("payment.price")}
        </Text>

        <Text
          align="center"
          size="2xl"
          className={cnMixFlex({ direction: "column", align: "center", justify: "center" })}>
          <Text className={styles.freePrice} weight="medium" view="link" as="span">
            {t("payment.testPrice")}
          </Text>
          <Text weight="medium">
            0
          </Text>
        </Text>
      </div>

      <Text align="center" size="m">
        {t("payment.description")}
      </Text>

      <div className={cnMixFlex({ align: "center", gap: "m", justify: "center" }, [styles.payBtn])}>
        <Button label="Пройти тестирование без оплаты" loading={isLoading} onClick={createTest} />
      </div>
    </Card>
  );
};
