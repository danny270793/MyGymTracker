import type { FC } from "react"
import { useTranslation } from "react-i18next"

export const App: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('helloWorld')}</h1>
    </>
  )
}
