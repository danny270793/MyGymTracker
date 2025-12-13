
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/stateless/layout'

export const ErrorPage: FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Layout.Content className="p-4 dark:bg-gray-800 dark:text-white">
        <h1>{t('error', { postProcess: 'capitalize' })}</h1>
      </Layout.Content>
    </Layout>
  )
}
