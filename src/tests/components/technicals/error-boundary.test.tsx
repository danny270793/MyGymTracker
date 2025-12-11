import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../../../components/technicals/error-boundary'
import { i18n } from '../../../i18n'

describe('ErrorBoundary', () => {
  it('should render ok', () => {
    const testText = 'Test'
    render(
      <ErrorBoundary>
        <div>{testText}</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText(new RegExp(testText, 'i'))).toBeInTheDocument()
  })

  it('should render error', () => {
    const errorButtonText = 'Throw error'
    render(
      <ErrorBoundary>
        <div>
          <button
            onClick={() => {
              throw new Error('Test')
            }}
          >
            {errorButtonText}
          </button>
        </div>
      </ErrorBoundary>,
    )
    fireEvent.click(screen.getByText(errorButtonText))
    const errorMessage = i18n.t('error', { postProcess: 'capitalize' })
    expect(screen.getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument()
  })
})
