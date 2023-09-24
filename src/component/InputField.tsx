import React, { useRef } from "react";
import "../style/styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void; // defined our handleAdd function like this since this function is not going to return anything
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  // We're gonna use useRef = is basically like when we use document.getElementByClassName or ById we are hooking particular components HTML
  const inputRef = useRef<HTMLInputElement>(null);
  //   then after useRef declare what type it is to get the type of this go to the html that we put this inputRef hover and get element of it in our case we use it in input

  const handleAddBack = (e: React.FormEvent) => {
    handleAdd(e); // we pass the handleAdd and store it in handleAddBack
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleAddBack} className="input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a Task"
        className="input_box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
