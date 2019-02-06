import { AppThunkAction } from "../../reducers"
import { AuthenticationError } from "../../services/auth"
import { setSignedIn, setMe } from "../../reducers/Auth"

export interface SignInResult {
    success: boolean
    message?: string
}

export const signInAction = (username: string, password: string, rememberMe: boolean): AppThunkAction<SignInResult> => {
    return async (dispatch, getState, { authService }) => {
        try {
            const token = await authService.login(username, password)
            const me = await authService.getMyProfile(token)
            await dispatch(setSignedIn(token, rememberMe))
            await dispatch(setMe(me))
            return { success: true }
        } catch (error) {
            if (error instanceof AuthenticationError)
                return { success: false, message: error.message }
            throw error
        }
    }
}