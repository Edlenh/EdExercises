import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from '../hooks/useAuthContext'
//components

import Details from '../components/Details'
import Form from '../components/Form'

const Home = ()=>{
    const {workouts,dispatch} =useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchWorkouts()
        }
    //dependecy array- itll only fire when the app first fires.
    }, [dispatch, user])

    return (
       <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
            <Details key={workout._id} workout={workout}/>
            ))}
        </div>
        <Form />
       </div>
    )
}

export default Home