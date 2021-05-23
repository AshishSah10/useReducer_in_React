import { useReducer, useState } from "react";
import "./styles.css";

// customHook replication on useReducer() hook
function useMyReducer(reducerFunc, initialValue){
  const [state, setState] = useState(initialValue);
  function myDispatch(actionObject){
    const updatedState = reducerFunc(state, actionObject)
    setState(updatedState);
  }
  return [state, myDispatch]
}

export default function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  //const [result, setResult] = useState(0);
  // const [result, dispatch] = useReducer(reducer, 0);
  const [result, dispatch] = useMyReducer(reducer, 0);


  function reducer(state, actionObject) {
    const { type, firstNumber, secondNumber } = actionObject;
    switch (type) {
      case "ADD":
        state = firstNumber + secondNumber;
        return state;
      case "SUBTRACT":
        state = firstNumber - secondNumber;
        return state;
      case "MULTIPLY":
        state = firstNumber * secondNumber;
        return state;
      case "DIVIDE":
        if (secondNumber === 0) {
          state = "Can not divide by 0"
          return state;
        }
        state = firstNumber / secondNumber;
        return state;
      case "ERROR":
        state = actionObject.error;
        return state;
      default:
        return state;
    }
  }
  // const handleAdd = () => {
  //   setResult(firstNumber + secondNumber)
  // }
  // const handleSubtract = () => {
  //   setResult(firstNumber - secondNumber)
  // }
  // const handleMultiply = () => {
  //   setResult(firstNumber * secondNumber)
  // }
  // const handleDivide = () => {
  //   if(secondNumber === 0){
  //     setResult("can not divide by 0")
  //     return
  //   }
  //   setResult(firstNumber / secondNumber)
  // }
  return (
    <div className="App">
      <input
        type="text"
        name="firstNumber"
        placeholder="First Number"
        value={firstNumber}
        onChange={(e) => {
          //console.log(firstNumber)
          setFirstNumber(Number(e.target.value));
        }}
      />
      <input
        type="number"
        name="firstNumber"
        placeholder="Second Number"
        value={secondNumber}
        onChange={(e) => setSecondNumber(Number(e.target.value))}
      />
      <div>{result}</div>
      <button
        onClick={() => dispatch({ type: "ADD", firstNumber, secondNumber })}
      >
        Add
      </button>
      <button
        onClick={() =>
          dispatch({ type: "SUBTRACT", firstNumber, secondNumber })
        }
      >
        Subtract
      </button>
      <button
        onClick={() =>
          dispatch({ type: "MULTIPLY", firstNumber, secondNumber })
        }
      >
        Multiply
      </button>
      <button
        onClick={() => dispatch({ type: "DIVIDE", firstNumber, secondNumber })}
      >
        Divide
      </button>
    </div>
  );
}
