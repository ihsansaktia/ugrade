import { push } from 'connected-react-router'
import { useAppThunkDispatch } from 'ugrade/common'
import { setInfo } from 'ugrade/contest/store'
import { AppThunkAction } from 'ugrade/store'

export function setContestAction(contestId: string): AppThunkAction {
  return async (dispatch, _getState, { contestService }) => {
    const contest = await contestService.getContestByShortId(contestId)
    dispatch(setInfo(contest))
    dispatch(push('/enter-contest/enter-email'))
  }
}

export function useSetContest() {
  const dispatch = useAppThunkDispatch()
  return (contestId: string) => dispatch(setContestAction(contestId))
}
