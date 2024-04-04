import { useState } from "react";

const Form = function (props) {
  const defaultFormInput = {
    "current-savings": 1000,
    "yearly-contribution": 1200,
    "expected-return": 10,
    duration: 5,
  };

  const [defInput, setInput] = useState(defaultFormInput);

  const userInput = (e) => {
    e.preventDefault();
    props.userInputCalculator(defInput);
  };

  const resetBtn = (e) => {
    setInput(defaultFormInput);
    props.setUserInput(null);
  };

  const inputChangeHandler = (input, value) => {
    console.log(input, value);
    setInput((prev) => {
      return {
        ...prev,
        [input]: value ? +value : '',
      };
    });
  };

  return (
    <form onSubmit={userInput} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            type="number"
            id="current-savings"
            value={defInput["current-savings"]}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            type="number"
            id="yearly-contribution"
            value={defInput["yearly-contribution"]}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            type="number"
            id="expected-return"
            value={defInput["expected-return"]}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            type="number"
            id="duration"
            value={defInput.duration}
          />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetBtn} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default Form;
