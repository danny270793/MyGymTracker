import { faker } from './faker'

export const chaosMonkey = {
  delay: async (milliseconds: number = 3000): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, milliseconds))
  },
  error: async (): Promise<void> => {
    throw new Error('Chaos Monkey is enabled')
  },
  doRandomStuffOnDevelopment: async (): Promise<void> => {
    if (
      import.meta.env.VITE_CHAOS_MONKEY_ENABLED === 'true' &&
      import.meta.env.DEV
    ) {
      if (faker.boolean()) {
        await chaosMonkey.delay(faker.numberBetween(1000, 3000))
        await chaosMonkey.error()
      } else {
        await chaosMonkey.delay()
      }
    }
  },
}
