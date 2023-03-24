import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutsContext = ()=>{
    const context = useContext(WorkoutContext)
    if(!context){
        throw Error('bad context')
    }
    return context 
}
