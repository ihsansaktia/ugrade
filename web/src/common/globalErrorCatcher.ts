import { ErrorInfo } from 'react'

export function globalErrorCatcher(error: Error, info?: ErrorInfo) {
  if (process.env.NODE_ENV === 'production') {
    // maybe use sentry?, for now we do nothing :(
  } else {
    console.error(error)
    if (info) console.info(info)
  }
}
