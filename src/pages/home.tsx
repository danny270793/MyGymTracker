import type { FC } from "react"
import { useTranslation } from "react-i18next"

export const HomePage: FC = () => {
    const { t } = useTranslation()
    
    return (
        <div>
            <h1>{t('helloWorld', { postProcess: 'capitalize' })}</h1>
        </div>
    )
}
