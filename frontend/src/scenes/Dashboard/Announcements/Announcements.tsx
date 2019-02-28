import React, {
  Component,
  ComponentType,
  FunctionComponent,
  useEffect,
} from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'

import { contestOnly } from '../../../helpers/auth'
import { withServer, WithServerProps } from '../../../helpers/server'
import { AppAction, AppState, AppThunkDispatch } from '../../../stores'
import { Announcement, getAnnouncementList } from '../../../stores/Contest'
import { useAnnouncements } from '../helpers/useAnnouncements'
import { readAnnouncementsAction } from './actions'
import { AnnouncementsView } from './AnnouncementsView'

export interface AnnouncementsSceneProps extends WithServerProps {
  announcements?: Announcement[]
  dispatch: AppThunkDispatch & Dispatch<AppAction>
}

export const AnnouncementsScene: FunctionComponent<AnnouncementsSceneProps> = ({
  announcements,
  dispatch,
  serverClock,
}) => {
  const readAllAnnouncements = async () => {
    if (announcements) {
      await new Promise(resolve => setTimeout(resolve, 2000)) // read after 2 seconds
      const unReads = announcements.filter(ann => !ann.read).map(ann => ann.id)
      if (unReads.length > 0) {
        dispatch(readAnnouncementsAction(unReads))
      }
    }
  }

  useAnnouncements(dispatch)
  useEffect(() => {
    readAllAnnouncements()
  }, [announcements])

  return (
    <AnnouncementsView
      announcements={announcements}
      serverClock={serverClock}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  announcements: getAnnouncementList(state),
})

export default compose<ComponentType>(
  contestOnly(),
  connect(mapStateToProps),
  withServer
)(AnnouncementsScene)