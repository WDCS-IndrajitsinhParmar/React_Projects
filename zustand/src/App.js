
import "./App.css";
import CourseForm from "./Component/CourseForm";
import CourseList from "./Component/CourseList";

function App() {
  return (
    <div className="App">
      <div className="main-container">
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "2rem"
      }}> My Course list</h1>
      <CourseForm/>
      <CourseList/>
    </div>
    </div>
  );
}

export default App;
