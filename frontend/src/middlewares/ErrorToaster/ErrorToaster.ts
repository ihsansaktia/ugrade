import { Action, Middleware } from 'redux'
import Toaster, { ActionToaster } from './ActionToaster'

export function createErrorToasterMiddleware(
  toaster: ActionToaster
): Middleware {
  return _store => next => <A extends Action>(action: A): A => {
    const result = next(action)
    const promise = Promise.resolve(result).catch(error => {
      toaster.showErrorToast(error)
      throw error
    })
    return (promise as unknown) as A
  }
}

export default createErrorToasterMiddleware(Toaster)