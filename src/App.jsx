import './App.css'
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';


function App() {
  const [todoList, setTodoList] = useState([]);
  
  // This is a callback function that is passed to the TodoForm component
  // This callback function updates the todoList state 
  const addTodo = (todoTitle) => {

    const todo = {
      id: Date.now(),
      title: todoTitle
    }
    setTodoList(previous => [todo, ...previous])

  }


  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    
    </div>
  )
}

export default App
