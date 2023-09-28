import { IJwtPayload} from "../Types"
import jwtDecode from "jwt-decode"
import { store } from "../store"
import { toast } from 'react-toastify'
import { logout } from "../redux/slice/authSlice"


type CheckType = 'network' | 'session' | 'both'

export const checkNetworkAndSession = (check: CheckType, next: () => void) => {

    const isNetworkConnected = navigator.onLine
    const token = store.getState().auth.token
    const currentTime = Date.now()
    const isUserLoggedIn = token
    const isSessionExpire = token && jwtDecode<IJwtPayload>(token).exp * 1000 - currentTime < 0
    if (check === 'network') {
        if (isNetworkConnected) {
            next();
            return
        }
        toast.warning('Check Your Internet Connection.')
    }
    else if (check === 'session') {
        if (isUserLoggedIn && !isSessionExpire) {
            next()
            return
        }
        if (!isUserLoggedIn) {
            toast.warning('Login Please.')
        }
        if (isUserLoggedIn && isSessionExpire) {
            toast.warning('Session Expired.')
            store.dispatch(logout())
        }

    }
    else if (check === 'both') {
        if (!isUserLoggedIn) {
            toast.warning('Login Please.')
        }
        if (isUserLoggedIn && isSessionExpire) {
            store.dispatch(logout());
            toast.warning('Session Expired.')
        }
        if (!isNetworkConnected) {
            toast.warning('Check your network.')
        }
        if (isNetworkConnected && isUserLoggedIn && !isSessionExpire) {
            next()
        }
    }

}