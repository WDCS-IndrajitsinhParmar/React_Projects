import React, { Fragment } from "react";
import useCourseStore from "../Store/store";

const CourseList = () => {
  const { courses, removeCourse, toggleCourseCompletion } = useCourseStore(
    (state) => ({
      courses: state.courses,
      removeCourse: state.removeCourse,
      toggleCourseCompletion: state.toggleCourseCompletion,
    })
  );
  return (
    <>
      <ul>
        {courses.map((course, id) => {
          return (
            <Fragment key={id}>
              <li
                className="course-item"
                style={{
                    color:course.completed ? "white" : "black",
                  backgroundColor: course.completed ? "#666666" : "white",
                }}
              >
                <span className="course-item-col-1">
                  <input
                    checked={course?.completed}
                    type="checkbox"
                    onChange={() => toggleCourseCompletion(course.id)}
                  />
                </span>
                <span>{course?.title}</span>
                <button
                  className="delete-btn"
                  onClick={() => removeCourse(course.id)}
                >
                  Delete
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default CourseList;
