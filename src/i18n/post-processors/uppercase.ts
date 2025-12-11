import type { PostProcessorModule } from 'i18next'
import { Strings } from '../../utils/strings'

export const uppercaseProcessor: PostProcessorModule = {
  type: 'postProcessor',
  name: 'uppercase',
  process(value: string): string {
    return Strings.upper(value)
  },
}