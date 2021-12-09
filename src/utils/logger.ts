export enum LogType {
  LOG = 'log',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
}
export default function logger(
  type: LogType,
  name: string,
  message: string | unknown | [],
  showStack?: false,
): void {
  console[type](`${type.toUpperCase()} on ${name}: `, message)
  showStack && console.trace(`Trace of ${name}`)
}
