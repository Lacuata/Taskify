import React from "react";
import { Todo } from "../Model";
import "../style/styles.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[]; //The Model array we created
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {/* declare Droppable and give it a droppableId  */}
      <Droppable droppableId="TodosList">
        {/* // then we need to pass an callback and shift it inside of there */}
        {(
          provided,
          snapshot // now inside of this function takes few parameter 1 provides 2
        ) => (
          //   provided take this provided and provide it to our parent div of this particular droppable and we need to provide a ref in our parent div that has {provided.innerRef}
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef} // ref will have provided a ref so that react beautiful DND can control this droppable zone
            {...provided.droppableProps} //spread the ...preovided.droppableProps
          >
            {/* so that react-beautiful-dnd can control this as drop zone and also need to spread the preovided.dropableProps*/}
            <span className="todos__heading">Active Tasks</span>
            {todos?.map(
              (
                todo,
                index //we pass the index on singleTodo
              ) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              )
            )}

            {/* provided placeholder provide a placeholder when we drop it here*/}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {/* function again and make this droppable Zone also that will drop here */}
        {(provided, snapshot) => (
          <div
            className={`todos-remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map(
              (
                todo,
                index //we pass the index on singleTodo
              ) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              )
            )}
            {/* provided placeholder provide a placeholder when we drop it here*/}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
