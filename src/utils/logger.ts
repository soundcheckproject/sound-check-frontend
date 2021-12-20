export enum LogType {
  LOG = 'log',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
}

export interface GraphQLError {
  extensions: { code: string }
  message: string
}

export interface LoggerType {
  logGraphQLError: (resolverName: string, errorArr: [GraphQLError]) => void
  log: (
    type: LogType,
    name: string,
    message: string | unknown | [],
    showStack?: false,
  ) => void
}

const log = (
  type: LogType,
  name: string,
  message: string | unknown | [],
  showStack = false,
): void => {
  console[type](`${type.toUpperCase()} > ${name}:`, message)
  showStack && console.trace(`Trace of ${name}`)
}

export default log

export const logGraphQLError = (
  resolverName: string,
  errorArr: [GraphQLError],
): void => {
  errorArr.map((err: GraphQLError) => {
    log(
      LogType.ERROR,
      resolverName,
      `${err.extensions.code} >>> ${err.message}`,
    )
  })
}

export const logRestError = (
  url: string,
  method: string,
  error: string,
  status: number,
): void => {
  log(LogType.ERROR, `${method} to ${url} results in ${status}`, error)
}
