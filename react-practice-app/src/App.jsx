import React from "react";
import "./App.css";

import axios from "axios";

export const CounterComp = () => {
    //New World w. React.useState()
    const [counter, setCounter] = React.useState(0);
    const increment = () => {
        setCounter(counter + 1);
        console.log(counter);
    };
    //Old World
    // let counter = 1;
    // const increment = () => {
    //   counter = counter + 1;
    //   console.log(counter)

    return (
        <div>
            {counter}

            <button onClick={increment}>Increment</button>
        </div>
    );
};

export const InputBoxComp = () => {
    const [inputText, setInputText] = React.useState("Jerome");
    let onChange = (event) => {
        const newText = event.target.value;
        setInputText(newText);
        console.log(inputText);
    };
    return (
        <div>
            <input type="text" placeholder="type here..." onChange={onChange} />
            {inputText}
        </div>
    );
};

export const ReducerComp = () => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "Increment":
                return { count: state.count + 1, showText: state.showText };
            case "toggleShowText":
                return { count: state.count, showText: !state.showText };
            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(reducer, {
        count: 0,
        showText: true,
    });
    return (
        <div>
            <h1>{state.count}</h1>
            <button
                onClick={() => {
                    dispatch({ type: "Increment" });
                    dispatch({ type: "toggleShowText" });
                }}
            >
                Click Here
            </button>
            {state.showText && <p>This is a text</p>}
        </div>
    );
};

export const UseEffectComp = () => {
    const [data, setData] = React.useState("");
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        axios
            .get("https://api.es-dictionary.com/api/random")
            .then((response) => {
                const message = `${response.data.word.word} is a ${response.data.word.part_of_speech} pronounced as ${response.data.word.pronunciation}. `;
                setData(message);
                console.log("request initiated: ", message);
            });
    }, [count]);

    return (
        <div>
            Hello World
            <h1>{count}</h1>
            <h2>{data}</h2>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Click
            </button>
        </div>
    );
};

export default function App() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                gap: "10px",
                textAlign: "center",
            }}
        >
            {/* <CounterComp />
      <InputBoxComp />  
      <ReducerComp />*/}

            <UseEffectComp />
        </div>
    );
}
