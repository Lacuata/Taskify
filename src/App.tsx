import React, { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./Model";
import InputField from "./component/InputField";
import TodoList from "./component/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); // our input field
  const [todos, setTodos] = useState<Todo[]>([]); // our Todos array contain Taskify
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //   Get the taskify added to lcoalStorage using useEffect
  //   useEffect(() => {
  //     const storedTodos = localStorage.getItem("TodoList");
  //     if (storedTodos) {
  //       setTodos(JSON.parse(storedTodos));
  //     }
  //   }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // if todo is truthy
      //setTodos [...todos means all data in todo add the { id: too and isDone}]
      //   setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      const newTodo = { id: Date.now(), todo, isDone: false }; // store to newTodo the task we  want to add
      setTodos([...todos, newTodo]); // store in in updateTodo with spread operator of todos means all data add a newTodo
      setTodo(""); // setTodo input field back to empty array

      // Save the updated todos to localStorage
      //   localStorage.setItem("TodoList", JSON.stringify([...todos, newTodo]));
    }
  };

  //   handleDrag
  const onDragEnd = (result: DropResult) => {
    //onDragEnd take parameter result from dragDropContext and type of DropResult
    // console.log(result);
    // let explore this in result when we drag and drop inside of console we have 2 fields first for destination and other for sources= sources is something where it came from, for Example it came from since it was from index[0] then destination where we drop it ot it will go to index 1  which is the completed Task

    // so what we gonna do first we're going to check if there is no destionation
    const { source, destination } = result;
    if (!destination) {
      // if destionation equal to empty or null or not !destination
      return; //return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // if destionation is equal to source or where we get it
      return; // return  or do nothing
    }

    // declare variable called add and active
    let add,
      active = todos, //why we assigned it to this active the todos? why can't we just directly manupulate it? Again when we manipulated our active variable, we are going to provide it to setTodos state so that will be more neat way to do this.
      complete = completedTodos;

    //   we're going to check first the source and we're going to take it from that
    if (source.droppableId === "TodosList") {
      //if it came from To Do List droppable ID
      add = active[source.index]; // store it on add = active[source.index] and the source.index of it

      // then we're gonna remove it from that particular place or that place which is TodosList or source.droppableId
      active.splice(source.index, 1); //splice is Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements. and 1 from this is remove 1 tem
    } else {
      // if it was in the complete
      add = complete[source.index];
      complete.splice(source.index, 1); //then remove it from complete
    }

    // now add the destination
    if (destination.droppableId === "TodosList") {
      // now we're gonna dd it inside of the array
      active.splice(destination.index, 0, add); // since we're adding it set it to destination,index , then 0 to not remove then add means add it
    } else {
      complete.splice(destination.index, 0, add);
    }

    // now we manipulated both of variables above we're gonna add it to our state. using setCompletedTodods(complete) that gonna have complete
    setCompletedTodos(complete);
    // and setTodos gonna have active or as active
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TASKIFY</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
