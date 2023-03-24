import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
//components

import Details from '../components/Details'
import Form from '../components/Form'

const Home = ()=>{
    const {workouts,dispatch} =useWorkoutsContext()

    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    //dependecy array- itll only fire when the app first fires.
    }, [dispatch])

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