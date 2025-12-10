import type { FC } from "react"
import { useTranslation } from "react-i18next"

export const ErrorPage: FC = () => {
    const { t } = useTranslation()
    
    return (
        <div>
            <h1>{t('error', { postProcess: 'capitalize' })}</h1>
        </div>
    )
}
