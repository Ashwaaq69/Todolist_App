import { useState, useRef, useEffect } from 'react';
import './Css/Todo.css';
import TodoItems from './TodoItems';

let count = 0; // Keeps track of todo count for unique IDs

const Todo = () => {
   const [todos, setTodos] = useState([]);
   const inputRef = useRef();

   // Function to add a new todo
   const add = () => {
      const taskText = inputRef.current.value.trim();
      if (taskText) {
         const newTodo = { no: count++, text: taskText, display: "" };
         const updatedTodos = [...todos, newTodo];
         setTodos(updatedTodos);
         inputRef.current.value = "";
         localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage with todos
         localStorage.setItem("todos_count", count); // Update count in localStorage
      }
   };

   useEffect(() => {
      // Load todos and count from localStorage on first render only
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(storedTodos);
      count = parseInt(localStorage.getItem("todos_count"), 10) || 0;
   }, []);

   useEffect(() => {
      // Update localStorage whenever todos state changes
      if (todos.length > 0) {
         localStorage.setItem("todos", JSON.stringify(todos));
      }
   }, [todos]);

   return (
      <div className='todo'>
         <div className="todo-header">Todo List</div>
         <div className="todo-add">
            <input ref={inputRef} type="text" placeholder='Add your task' className='todo-input' />
            <div onClick={add} className="todo-add-btn">ADD</div>
         </div>
         <div className="todo-list">
            {todos.map((item) => (
               <TodoItems 
                  key={item.no}
                  setTodos={setTodos} 
                  todos={todos} 
                  no={item.no} 
                  display={item.display} 
                  text={item.text} 
               />
            ))}
         </div>
      </div>
   );
}

export default Todo;
