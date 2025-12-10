export const Strings = {
  capitalize: (s: string) =>
    s.replace(/\p{L}/u, (c: string) => c.toUpperCase()),
  upper: (s: string) => s.toUpperCase(),
  safeStringify(obj: unknown): string {
    const seen = new WeakSet()
    return JSON.stringify(obj, (_key: string, value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]'
        }
        seen.add(value)
      }
      return value
    })
  },
}
