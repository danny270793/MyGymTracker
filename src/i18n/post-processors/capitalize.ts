import type { PostProcessorModule } from 'i18next'
import { Strings } from '../../utils/strings'

export const capitalizeProcessor: PostProcessorModule = {
  type: 'postProcessor',
  name: 'capitalize',
  process(value: string): string {
    return Strings.capitalize(value)
  },
}
