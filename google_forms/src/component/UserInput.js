import React from "react";
import { userData } from "../data";
import { useState } from "react";

function UserInput() {
  const [data, setData] = useState(userData);

  const handleChange = (e, id) => {
    let newData = data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          [e.target.id]: e.target.value,
        };
      } else {
        return {
          ...d,
        };
      }
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
    // localStorage.setItem("form1", JSON.stringify(data));
    console.log("submit", data);
  };

  return (
    <form className="color" onSubmit={handleSubmit}>
      {data?.map((v, index) => {
        return (
          <section key={v.id}>
            <div>
              <input
                type="text"
                id="question"
                placeholder={v.question}
                className={v.id === 1 ? "title" : "label"}
                onChange={(e) => handleChange(e, v.id)}
              />
              {v.id !== 1 && (
                <select id="input" onChange={(e) => handleChange(e, v.id)}>
                  <option value="text">Text</option>
                  <option value="text-area">Paragraph</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Multiple choice</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              )}
              {v.input === "text" && v.id !== 1 && (
                <span className="short_answer">Short answer</span>
              )}
              {v.id === 1
                ? v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      <textarea
                        className="description"
                        id="value"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      >
                        Description
                      </textarea>
                    </React.Fragment>
                  ))
                : v.input === "text-area" &&
                  v.id !== 1 && (
                    <span className="long_answer">Long answer</span>
                  )}
              {v.input === "checkbox" && v.id !== 1 && (
                <div>
                  {v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      {/* <input type={v.input} id="input-types" /> */}
                      <input
                        type="text"
                        id="value"
                        placeholder="Option 1"
                        className="label2"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      />
                      {v.inputValue.length > 1 && (
                        <span onClick={() => handleOptionsDelete(v.id, val.id)}>
                          x
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                  <span onClick={(e) => handleAddMore(e, v.id)}>add more</span>
                </div>
              )}
              {v.input === "radio" && v.id !== 1 && (
                <div>
                  {v.inputValue.map((val, ind) => (
                    <React.Fragment key={ind}>
                      <span>o</span>
                      <input
                        type="text"
                        id="value"
                        placeholder="Option 1"
                        className="label2"
                        onChange={(e) => handleChangeMore(e, val.id, v.id)}
                      />
                      {v.inputValue.length > 1 && (
                        <span onClick={() => handleOptionsDelete(v.id, val.id)}>
                          x
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                  <span onClick={(e) => handleAddMore(e, v.id)}>add more</span>
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
                        <span onClick={() => handleOptionsDelete(v.id, val.id)}>
                          x
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                  <span onClick={(e) => handleAddMore(e, v.id)}>add more</span>
                </div>
              )}
            </div>
            {v.id !== 1 && (
              <>
                <div>
                  <input
                    type="checkbox"
                    id="required"
                    onChange={(e) => handleRequired(e, v.id)}
                  />
                  <span>Required</span>
                </div>
                <span onClick={() => handleDelete(v.id)}>Delete</span>
                <span onClick={handleMoreInputs}>Add more inputs</span>
              </>
            )}
          </section>
        );
      })}
      <button>submit</button>
    </form>
  );
}

export default UserInput;
