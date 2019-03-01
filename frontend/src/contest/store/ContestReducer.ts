import { Reducer } from 'redux'
import { ContestActionType } from './ContestAction'
import {
  ContestReadAnnouncements,
  readAnnouncementsReducer,
} from './ContestReadAnnouncements'
import {
  ContestSetAnnouncements,
  setAnnouncementsReducer,
} from './ContestSetAnnouncements'
import {
  ContestSetClarifications,
  setClarrificationsReducer,
} from './ContestSetClarrifications'
import { ContestSetInfo, setInfoReducer } from './ContestSetInfo'
import { ContestSetProblems, setProblemsReducer } from './ContestSetProblems'
import {
  ContestSetRegistered,
  setRegisteredReducer,
} from './ContestSetRegistered'
import {
  ContestSetSubmissions,
  setSubmissionReducer,
} from './ContestSetSubmissions'
import { ContestState, initialValue } from './ContestState'
import { ContestUnsetContest, unsetContestReducer } from './ContestUnsetContest'

export const contestReducer: Reducer<ContestState> = (
  state: ContestState = initialValue,
  action
): ContestState => {
  switch (action.type) {
    case ContestActionType.SetInfo:
      return setInfoReducer(state, action as ContestSetInfo)

    case ContestActionType.SetRegistered:
      return setRegisteredReducer(state, action as ContestSetRegistered)

    case ContestActionType.UnsetContest:
      return unsetContestReducer(state, action as ContestUnsetContest)

    case ContestActionType.SetAnnouncements:
      return setAnnouncementsReducer(state, action as ContestSetAnnouncements)

    case ContestActionType.SetProblems:
      return setProblemsReducer(state, action as ContestSetProblems)

    case ContestActionType.ReadAnnouncements:
      return readAnnouncementsReducer(state, action as ContestReadAnnouncements)

    case ContestActionType.SetClarifications:
      return setClarrificationsReducer(
        state,
        action as ContestSetClarifications
      )

    case ContestActionType.SetSubmissions:
      return setSubmissionReducer(state, action as ContestSetSubmissions)
  }
  return state
}