import { AuthenticationError, User } from '../../services/auth'
import { AppThunkAction } from '../../stores'
import { setMe, setSignedOut } from '../../stores/Auth'

export const getProfile = (): AppThunkAction<User> => {
  return async (dispatch, getState, { authService }) => {
    try {
      const token = getState().auth.token
      const me = await authService.getMyProfile(token)
      await dispatch(setMe(me))
      return me
    } catch (error) {
      if (error instanceof AuthenticationError) await dispatch(setSignedOut())
      throw error
    }
  }
}
