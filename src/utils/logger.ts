type LogType = 'debug' | 'error' | 'warn'

export class Logger {
  private readonly name: string
  constructor(name: string) {
    this.name = name
  }
  write(type: LogType, message: string): void {
    if (import.meta.env.DEV) {
      const text: string = `${this.name} ${type} ${message}`
      if (type === 'error') {
        console.error(text)
      } else {
        console.log(text)
      }
    }
  }
  debug(message: string): void {
    this.write('debug', message)
  }
  warn(message: string): void {
    this.write('warn', message)
  }
  error(message: string, error: unknown = undefined): void {
    this.write('error', message)
    if (error) {
      console.error(error)
    }
  }
}
