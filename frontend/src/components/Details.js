import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useState } from "react";

const Details = ({workout})=>{
    const {dispatch} = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      title: workout.title,
      weight: workout.weight,
      reps: workout.reps
    });

    const deleteClick =async ()=>{
        const response = await fetch('/api/workouts/' + workout._id,{
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const updateClick = () => {
        setIsEditing(true);
      };
    
      const cancelClick = () => {
        setIsEditing(false);
      };
    
      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/workouts/' + workout._id, {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
    
        if (response.ok) {
          setIsEditing(false);
          dispatch({type: 'UPDATE_WORKOUT', payload: json});
        }
      };

      if (isEditing) {
        return (
          <form onSubmit={handleSubmit}>
            <h4>Edit Workout</h4>
            <label>Exercise:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label>Weight(lb):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <label>Reps:</label>
            <input
              type="number"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelClick}>Cancel</button>
          </form>
        );
      }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weight(lb):</strong>{workout.weight}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <h2 className="material-symbols-outlined"onClick={deleteClick}>delete</h2>
            <span className="material-symbols-outlined" onClick={updateClick}>edit</span>
        </div>
    )
}

export default Details