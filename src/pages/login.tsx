import type { FC } from "react"
import { useTranslation } from "react-i18next"

export const LoginPage: FC = () => {
    const { t } = useTranslation()
    
    return (
        <div>
            <h1>{t('login', { postProcess: 'capitalize' })}</h1>
        </div>
    )
}
