import { Announcement } from '../../services/contest/Announcement'
import { AppThunkAction } from '../../stores'
import { setCurrentContestAnnouncements } from '../../stores/Contest'

export const getContestAnnouncement = (
  id: number
): AppThunkAction<Announcement[]> => {
  return async (dispatch, getState, { contestService }) => {
    const announcements = await contestService.getAccouncementsByContestId(id)
    await dispatch(setCurrentContestAnnouncements(id, announcements))
    return announcements
  }
}
