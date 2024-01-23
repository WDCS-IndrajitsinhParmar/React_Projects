import React from "react";
import { userData } from "../data";
import { useState } from "react";

function UserInput() {
  const [data, setData] = useState(userData);
  const localdata = JSON.parse(localStorage.getItem("form1")) || [];

  const handleChange = (e, id) => {
    let newData = data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          [e.target.id]: e.target.value,
          inputValue: [
            {
              id: 1,
              value: "",
            },
          ],
        };
      } else {
        return {
          ...d,
        };
      }
      // console.log(d)
    });
    setData(newData);
  };
  const handleRequired = (e, id) => {
    let newData = data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          [e.target.id]: e.target.checked,
        };
      } else {
        return {
          ...d,
        };
      }
    });
    setData(newData);
  };

  const handleChangeMore = (e, param1, param2) => {
    let newdata = data.map((d) => {
      if (d.id === param2) {
        let newValue = d.inputValue.map((da) => {
          if (da.id === param1) {
            return {
              ...da,
              [e.target.id]: e.target.value,
            };
          } else {
            return {
              ...da,
            };
          }
        });
        return {
          ...d,
          inputValue: newValue,
        };
      } else {
        return {
          ...d,
        };
      }
    });
    setData(newdata);
  };

  const handleAddMore = (e, param1) => {
    let newdata = data.map((d) => {
      if (d.id === param1) {
        return {
          ...d,
          inputValue: [
            ...d.inputValue,
            {
              id: Math.floor(Math.random() * 100),
              value: "",
            },
          ],
        };
      } else {
        return {
          ...d,
        };
      }
    });
    setData(newdata);
  };

  const handleOptionsDelete = (param1, param2) => {
    let newdata = data.map((d) => {
      if (d.id === param1) {
        return {
          ...d,
          inputValue: d.inputValue.filter((da) => da.id !== param2),
        };
      } else {
        return {
          ...d,
        };
      }
    });
    setData(newdata);
  };

  const handleMoreInputs = () => {
    setData((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 100),
        question: "Question",
        input: "text",
        inputValue: [
          {
            id: 1,
            value: "answer",
          },
        ],
        required: "false",
      },
    ]);
  };

  const handleDelete = (id) => {
    let newData = data.filter((data) => data.id !== id);
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localdata.push(data)
    localStorage.setItem("form1", JSON.stringify(localdata));
    console.log("submit", data);
  };

  return (
    <form className="color" onSubmit={handleSubmit}>
      {data?.map((v, index) => {
        return (
          <section key={v.id} className={v.id === 1 ? "main" : "main_input"}>
            <div className={v.id === 1 ? "title_section" : ""}>
              <input
                type="text"
                id="question"
                placeholder={v.question}
                className={v.id === 1 ? "title" : "label"}
                onChange={(e) => handleChange(e, v.id)}
              />
              {v.id !== 1 ? (
                <select
                  id="input"
                  onChange={(e) => handleChange(e, v.id)}
                  className="select"
                >
                  <option value="text">Text</option>
                  <option value="text-area">Paragraph</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Multiple choice</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              ) : (
                v.inputValue.map((val, ind) => (
                  <React.Fragment key={ind}>
                    <textarea
                      className="title_textarea"
                      id="value"
                      placeholder="Description"
                      onChange={(e) => handleChangeMore(e, val.id, v.id)}
                    ></textarea>
                  </React.Fragment>
                ))
              )}

              {v.input === "text" && v.id !== 1 && (
                <p className="dummy_answer">Short answer</p>
              )}
              {v.input === "text-area" && v.id !== 1 && (
                <p className="dummy_answer">Long answer</p>
              )}

              {v.input === "checkbox" && v.id !== 1 && (
                <div>
                  {v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      <input
                        type="text"
                        id="value"
                        placeholder="Option 1"
                        className="label2"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      />
                      {v.inputValue.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleOptionsDelete(v.id, val.id)}
                          className="button close_button"
                        >
                          x
                        </button>
                      )}
                      <br></br>
                    </React.Fragment>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => handleAddMore(e, v.id)}
                    className="button"
                  >
                    Add more
                  </button>
                </div>
              )}
              {v.input === "radio" && v.id !== 1 && (
                <div>
                  {v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      <input
                        type="text"
                        id="value"
                        placeholder="Option 1"
                        className="label2"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      />
                      {v.inputValue.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleOptionsDelete(v.id, val.id)}
                          className="button close_button"
                        >
                          x
                        </button>
                      )}
                      <br></br>
                    </React.Fragment>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => handleAddMore(e, v.id)}
                    className="button"
                  >
                    Add more
                  </button>
                </div>
              )}
              {v.input === "dropdown" && v.id !== 1 && (
                <div>
                  {v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      <span>{ind + 1}</span>
                      <input
                        type="text"
                        id="value"
                        placeholder="Option 1"
                        className="label2"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      />
                      {v.inputValue.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleOptionsDelete(v.id, val.id)}
                          className="button close_button"
                        >
                          x
                        </button>
                      )}
                      <br></br>
                    </React.Fragment>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => handleAddMore(e, v.id)}
                    className="button"
                  >
                    Add more
                  </button>
                </div>
              )}
            </div>

            {v.id !== 1 && (
              <div className="flex_row">
                <div style={{ marginBlock: "10px" }}>
                  <input
                    type="checkbox"
                    id="required"
                    onChange={(e) => handleRequired(e, v.id)}
                  />
                  <span>Required</span>
                </div>
                <div style={{ marginBlock: "10px" }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(v.id)}
                    className="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </section>
        );
      })}
      <div className="flex_row flex_row2">
        <button type="button" onClick={handleMoreInputs} className="button">
          Add more inputs
        </button>
        <button className="button">submit</button>
      </div>
    </form>
  );
}

export default UserInput;
