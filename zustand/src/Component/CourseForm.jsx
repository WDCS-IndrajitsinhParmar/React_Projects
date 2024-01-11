import React, {useState} from 'react'
import useCourseStore from '../Store/store'


const CourseForm = () => {
    const addCourse = useCourseStore((state)=>state.addCourse);
    let [courseTitle, setCourseTitle] = useState("")
    const handleSubmit = ()=>{
        addCourse({
            id:Math.floor(Math.random()*100000),
            title:courseTitle,
            completed:false
        })
        setCourseTitle("")
    }
  return (
    
    <div className="form-container">
        <input 
        value={courseTitle}
        onChange={(e) => {
            setCourseTitle(e.target.value)
        }}
        className="form-input" />
        <button
        onClick={handleSubmit} 
        className="form-submit-btn">
            Add Course
        </button>
    </div>
  )
}

export default CourseForm