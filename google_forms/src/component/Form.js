import React, { useState } from "react";

function Form() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("form1")));
  console.log(data);
  return (
    <form className="color">
      {data?.map((da) => (
        <>
        {da.id === 1 && (
            <section>
            <h1>{da.question}</h1>
            <h3>Kindly fill your details here</h3>
          </section>
        )}
          <section>
            <div>
              <label>{da.id !== 1 && da.question}</label>
              {da.id !== 1 && da.input === "text" && da.inputValue.map((d)=>(<input type="text" placeholder={d.value} ></input>))}
              {da.id !== 1 && da.input === "text-area" && da.inputValue.map((d)=>(<textarea placeholder={d.value} ></textarea>))}
              {da.id !== 1 && da.input === "checkbox" && da.inputValue.map((d)=>(<><input type="checkbox" /><label>{d.value}</label></>))}
              {da.id !== 1 && da.input === "radio" && da.inputValue.map((d)=>(<><input type="radio" name="interest"/><label>{d.value}</label></>))}
              {da.id !== 1 && da.input === "dropdown" && (<select>{da.inputValue.map((d)=>(<><option>{d.value}</option></>))}</select>)}
            
            </div>
          </section>
        </>
      ))}
    </form>
  );
}

export default Form;
