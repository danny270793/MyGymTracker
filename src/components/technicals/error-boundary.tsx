import React, { type ErrorInfo } from 'react'
import { withTranslation, type WithTranslation } from 'react-i18next'
import { Logger } from '../../utils/logger'
import { ErrorPage } from '../../pages/error-page'

const logger: Logger = new Logger('/src/components/common/error-boundary.tsx')

interface ErrorBoundaryProps extends WithTranslation {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundaryBase extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(`error=${error} errorInfo=${JSON.stringify(errorInfo)}`)
  }

  render() {
    if (this.state.error) {
      return this.props.fallback || <ErrorPage />
    }

    return this.props.children
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryBase)
