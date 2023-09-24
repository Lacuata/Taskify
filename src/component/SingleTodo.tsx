import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../Model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../style/styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number; //since the index we are dragging is a number from id
  todo: Todo; // the Model we created
  todos: Todo[]; //the array of Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo); // the todo map we pass on TodoList

  //   handleDone if we are already done or if we are already do the task
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  //   handleDelete
  const handleDelete = (id: number) => {
    // means that filter true or false if todo.id !== or not equal to id we pass which is
    // setTodos(todos.filter((todo) => todo.id !== id));
    // it's gonna return it to new array if todo.id === id we pass it's not gonna return it or just removed it

    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);

    // this will delete only the deleteTodo id in our localStorage
    localStorage.setItem("TodoList", JSON.stringify(deleteTodo));
  };

  //   handleEdit and receive the passing data
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      // means that if todo.id === to id that we pass
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
      // ...todo all data from todo, todo:editTodo means edit or update todo else return todo
    );
    // then set edit to false  after to
    setEdit(false);
  };

  //   useEffect whenever the edit changes it's going to fire off it means going to
  useEffect(() => {
    inputRef.current?.focus(); //means it's going to focus in edit input field when we clicked the edit icon
  }, [edit]); // whenever the edit changes or

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        // passing to handleEdit e = event and todo is
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps} //for drag
          {...provided.dragHandleProps} // for handle drag
          ref={provided.innerRef} // to control it properly
        >
          {/* if edit is true show this edit  */}
          {edit ? (
            <input
              type="text"
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? ( // this is else if
            // run this code s means strike tag means a line in the middle of the word
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            // else just show todo.todo
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                // if edit is is not false because edit is false in useState and !todo.isDone is not false also means they are both true
                if (!edit && !todo.isDone) {
                  // setEdit(!edit) which is true
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
