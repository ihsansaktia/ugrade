import { AppThunkAction } from '../../../../stores'
import { setClarifications } from '../../../../stores/Contest/ContestSetClarrifications'
import { normalizeClarification } from '../util'

export const readClarificationEntriesAction = (
  clarificationId: string,
  entryIds: string[]
): AppThunkAction<void> => {
  return async (dispatch, getState, { contestService }) => {
    const token = getState().auth.token
    const clarification = await contestService.readClarificationEntries(
      token,
      clarificationId,
      entryIds
    )
    const clarif = normalizeClarification(clarification)
    const stillRelevant = getState().auth.token === token
    if (stillRelevant) dispatch(setClarifications([clarif]))
  }
}
