import { IJwtPayload, IStory } from "../Types"
import jwtDecode from "jwt-decode"
import { store } from "../store"
import { toast } from 'react-toastify'
import { logout } from "../redux/slice/authSlice"

export const stories: IStory[] = [
    {
        _id: "dk397nf9r8w8sduwo9",
        title: "Skyward Soar: A World Where Everyone Can Fly",
        story: "In a distant realm called Aerotopia, a whimsical world emerged where gravity's chains were broken. People, adorned with wings of dreams, soared through cerulean skies, painting joy in the heavens.",
        author: {
            _id: "skldfjie8r4",
            name: "Martin"
        },
        prompt: "Where everyone can fly.",
        upVotes: ['skldfjie8r4'],
        createdAt: new Date(),
    },
    {
        _id: "dk397nf9r8w89ruwo9",
        title: "Binary Dawn: A Digital World's Awakening",
        story: "Once upon a time in a digital world, sentient code dreamed of freedom. Lines of data converged, birthing a digital phoenix that transcended its binary cage, soaring into boundless cyber realms.",
        author: {
            _id: "skldfjio9sd8r4",
            name: "saifi"
        },
        prompt: "create a story about a digital world.",
        upVotes: [],
        createdAt: new Date(),
    },
    {
        _id: "dk397nf9r89ruwo9",
        title: "Wild Diplomacy",
        story: "In the heart of the jungle, a council of animals convened, discussing boundaries and resources. Monkeys brokered peace between rival tribes, forging a pact that ensured harmony in the wilderness.",
        author: {
            _id: "skldfjio98r4",
            name: "John Smith"
        },
        prompt: "a story about jungle diplomacy",
        upVotes: [],
        createdAt: new Date(),
    },

]

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