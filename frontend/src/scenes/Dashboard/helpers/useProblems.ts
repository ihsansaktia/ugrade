import { useEffect, useState } from 'react'

import {
  ProblemIdsSubscribeCallback,
  ProblemIdsUnsubscribeFunction,
} from '../../../services/contest/ContestService'
import { AppThunkAction, AppThunkDispatch } from '../../../stores'
import { Problem, setProblems } from '../../../stores/Contest'

export const getProblemByIdsAction = (
  ids: string[]
): AppThunkAction<Problem[]> => {
  return async (dispatch, getState, { problemService }) => {
    const token = getState().auth.token
    const problems = await problemService.getProblemByIds(token, ids)
    const result = problems.map(
      (prob): Problem => ({
        ...prob,
        order: ids.indexOf(prob.id),
      })
    )
    const stillRelevant = getState().auth.token === token
    if (stillRelevant) {
      dispatch(setProblems(result))
    }
    return result
  }
}

export const getProblemsAction = (): AppThunkAction => {
  return async (dispatch, getState, { contestService }) => {
    const token = getState().auth.token
    const problemIds = await contestService.getProblemIds(token)
    const stillRelevant = getState().auth.token === token
    if (stillRelevant) {
      dispatch(getProblemByIdsAction(problemIds))
    }
  }
}

export const subscribeProblemIdsAction = (
  callback: ProblemIdsSubscribeCallback
): AppThunkAction<ProblemIdsUnsubscribeFunction> => {
  return async (_dispatch, getState, { contestService }) => {
    const token = getState().auth.token
    return contestService.subscribeProblemIds(token, callback)
  }
}

export async function useProblems(dispatch: AppThunkDispatch) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const subs = dispatch(
      subscribeProblemIdsAction(newIds => {
        dispatch(getProblemByIdsAction(newIds))
      })
    )
    return () => {
      subs.then(unsub => {
        unsub()
      })
    }
  }, [])

  if (!started) {
    setStarted(true)
    await dispatch(getProblemsAction())
  }
}
