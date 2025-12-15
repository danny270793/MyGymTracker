type LogType = 'debug' | 'error' | 'warn'

export class Logger {
  private readonly name: string
  constructor(name: string) {
    this.name = name
  }
  write(type: LogType, ...messages: string[]): void {
    if (import.meta.env.DEV) {
      const text: string = `${this.name} ${type} ${messages}`
      if (type === 'error') {
        console.error(text)
      } else {
        console.log(text)
      }
    }
  }
  debug(...messages: string[]): void {
    this.write('debug', ...messages)
  }
  warn(...messages: string[]): void {
    this.write('warn', ...messages)
  }
  error(message: string, error: unknown = undefined): void {
    this.write('error', ...message)
    if (error) {
      console.error(error)
    }
  }
}
