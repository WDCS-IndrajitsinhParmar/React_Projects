import React, { useState } from "react";

function Form() {
  let allForms = JSON.parse(localStorage.getItem("form1"));
  const [data] = useState(allForms[2]);
  const [yourData, setYourData] = useState({});
  const [checkedx, setCheckedx] = useState({});

  const handleChange = (e) => {
    setYourData({
      ...yourData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      let checkedValue =
        checkedx[`${e.target.id}`] === undefined
          ? []
          : checkedx[`${e.target.id}`];
     
      setCheckedx({
        ...checkedx,
        [e.target.id]: [...checkedValue, e.target.value],
      });
    } else {
      let checkedValue = checkedx[`${e.target.id}`]?.filter(
        (curElem) => curElem !== e.target.value
      );
      setCheckedx({
        ...checkedx,
        [e.target.id]: checkedValue,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...yourData, ...checkedx });
  };
  // console.log(data);
  return (
    <form className="color" onSubmit={handleSubmit}>
      {data?.map((da, index) => (
        <React.Fragment key={index}>
          {da.id === 1 && (
            <section className="main">
              <div className="title_section">
                <h1>{da.question}</h1>
                <p>Kindly fill your details here</p>
              </div>
            </section>
          )}
          <section className="main_input">
            <div className="flex_column">
              <label>{da.id !== 1 && da.question}</label>
              {da.id !== 1 &&
                da.input === "text" &&
                da.inputValue.map((d, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={d.value}
                      className=""
                      id={`${da.question} ${index}`}
                      onChange={handleChange}
                    ></input>
                  </div>
                ))}
              {da.id !== 1 &&
                da.input === "text-area" &&
                da.inputValue.map((d, index) => (
                  <div key={index}>
                    <textarea
                      placeholder={d.value}
                      id={`${da.question} ${index}`}
                      onChange={handleChange}
                    ></textarea>
                  
                  </div>
                ))}
              {da.id !== 1 &&
                da.input === "checkbox" &&
                da.inputValue.map((d, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`${da.question}`}
                      onChange={handleChecked}
                      value={d.value}
                    />
                    <label>{d.value}</label>
                  </div>
                ))}
              {da.id !== 1 &&
                da.input === "radio" &&
                da.inputValue.map((d, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="interest"
                      id={`${da.question} ${index}`}
                      value={d.value}
                      onChange={handleChange}
                    />
                    <label>{d.value}</label>
                  </div>
                ))}
              {da.id !== 1 && da.input === "dropdown" && (
                <select onChange={handleChange} id={`${da.question} ${index}`}>
                  {da.inputValue.map((d, index) => (
                    <React.Fragment key={index}>
                      <option id={`${da.question} ${index}`}>{d.value}</option>
                    </React.Fragment>
                  ))}
                </select>
              )}
            </div>
          </section>
        </React.Fragment>
      ))}
      <button className="button">submit</button>
    </form>
  );
}

export default Form;
