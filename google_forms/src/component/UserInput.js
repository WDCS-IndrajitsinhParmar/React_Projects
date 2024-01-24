import React from "react";
import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import { useRef } from "react";

function Home() {
  let data = JSON.parse(localStorage.getItem("forms")) || [];
  console.log("first");
  const [id, setId] = useState(null);
  let inputRef = useRef({
    title: "",
    title_description: "",
    inputs: [],
  });
  console.log(inputRef.current);


  //add input section
  const addInput = () => {
    let id = uuidV4();
    inputRef.current.inputs.push({
      _id: id,
      question: "",
      options: [{ id: id + 1, option: "" }],
      inputType: "text",
      required: true,
    });
    setId(id);
  };
  console.log(inputRef.current);

  
  //change input value of title
  const handleChange = (e) => {
    const { name, value } = e.target;
    inputRef.current[name] = value;
    console.log(inputRef.current);
  };

  //change input value of input section [questoin] 
  const handleChangeInner = (e, index) => {
    const { name, value, checked } = e.target;
    name === "question"
      ? (inputRef.current.inputs[index][name] = value)
      : (inputRef.current.inputs[index][name] = checked);
  };

  //change input value of the options fields of radio,checkbox and dropdown input type
  const handleChangeOptions = (e, inde, index) => {
    const { name, value } = e.target;
    inputRef.current.inputs[index].options[inde][name] = value;
  };

  //change input type
  const handlechangeType = (e, index) => {
    let id = uuidV4();
    const { name, value } = e.target;
    inputRef.current.inputs[index][name] = value;
    inputRef.current.inputs[index].options = [
      {
        id: id,
        option: "",
      },
    ];
    setId(id);
  };

  //delete input section
  const handleDelete = (e, id) => {
    let new_inputs = inputRef.current.inputs.filter((inp) => inp._id !== id);
    console.log(new_inputs);
    inputRef.current.inputs = new_inputs;
    setId(uuidV4());
  };

  //delete option of radio,checkbox and dropdown input type
  const handleOptionDelete = (id, index) => {
    console.log(inputRef.current.inputs[index]);
    let new_options = inputRef.current.inputs[index].options.filter(
      (inp) => inp.id !== id
    );
    console.log(new_options);
    inputRef.current.inputs[index].options = new_options;
    setId(uuidV4());
  };

  //add options for radio,checkbox and dropdown type
  const handleAddOptions = (index) => {
    let id = uuidV4();
    console.log(inputRef.current.inputs[index]);
    inputRef.current.inputs[index].options.push({
      id: id,
      option: "",
    });
    setId(uuidV4());
  };


  //add ui on addInput
  const handleInput = () => {
    let input = inputRef.current.inputs?.map((v, index) => (
      <div key={v._id}>
        <div>
          <input
            type="text"
            name="question"
            placeholder="question"
            onChange={(e) => handleChangeInner(e, index)}
          />
          <select name="inputType" onChange={(e) => handlechangeType(e, index)}>
            <option value="text">Text</option>
            <option value="text-area">Paragraph</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Multiple choice</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        {v.inputType === "text" && <p>short answer</p>}
        {v.inputType === "text-area" && <p>long answer</p>}
        {(v.inputType === "checkbox" ||
          v.inputType === "radio" ||
          v.inputType === "dropdown") &&
          v.options.map((va, inde) => (
            <div key={va.id + 1}>
              <div>
                <input
                  type="text"
                  name="option"
                  placeholder="option"
                  onChange={(e) => handleChangeOptions(e, inde, index)}
                />
                {v.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleOptionDelete(va.id, index)}
                  >
                    X
                  </button>
                )}
              </div>
              <button type="button" onClick={() => handleAddOptions(index)}>
                Add more
              </button>
            </div>
          ))}
        <div>
          <label>
            <input
              type="checkbox"
              name="required"
              defaultChecked
              onChange={(e) => handleChangeInner(e, index)}
            />{" "}
            Required
          </label>
          <button type="button" onClick={(e) => handleDelete(e, v._id)}>
            Delete
          </button>
        </div>
      </div>
    ));
    return input;
  };


  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    data.push(inputRef.current);
    localStorage.setItem("forms", JSON.stringify(data));
    console.log(inputRef.current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text input:{" "}
        <input
          name="title"
          placeholder="Untitled Form"
          onChange={handleChange}
        />
      </label>
      <label>
        Text input:{" "}
        <textarea
          name="title_description"
          placeholder="Form description"
          onChange={handleChange}
        />
      </label>
      <hr />
      {handleInput()}
      <button type="button" onClick={addInput}>
        Add Input Field
      </button>
      <button type="submit">Submit form</button>
    </form>
  );
}

export default Home;
