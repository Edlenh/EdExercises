import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Form = ()=> {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields]= useState([])

const handleSubmit = async(e)=>{
    e.preventDefault()
    const workout = {title, weight, reps}
    const response = await fetch('/api/workouts', {
        method: 'POST', 
        body: JSON.stringify(workout),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle('')
        setWeight('')
        setReps('')
        setError(null)
        setEmptyFields([])
        console.log('New Workout Created!', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
}
    return(
        <form className ="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise: </label>
            <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')?'error': ''}
            />
            <label>Weight(lb):</label>
            <input
            type="number"
            onChange={(e)=>setWeight(e.target.value)}
            value={weight}
            className={emptyFields.includes('weight')? 'error': ''}
            />
            <label>Reps:</label>
            <input
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps')? 'error': ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Form