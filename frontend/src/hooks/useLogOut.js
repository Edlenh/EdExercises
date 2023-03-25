import { useAuthContext } from "./useAuthContext"
import {useWorkoutsContext} from "./useWorkoutsContext"

export const useLogout = ()=>{
    const {dispatch} = useAuthContext()
    const {dispatch : workOutsDispatch } = useWorkoutsContext()
    const logout = ()=>{
        localStorage.removeItem('user')
    
    dispatch({type: 'LOGOUT'})
    workOutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout}
}