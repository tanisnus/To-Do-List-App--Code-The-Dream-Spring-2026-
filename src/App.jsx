import './App.css'
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoList/TodoForm';
import { useState } from 'react';


function App() {
  const [todoList, setTodoList] = useState([]);
  
  // This is a callback function that is passed to the TodoForm component
  // This callback function updates the todoList state 
  const addTodo = (todoTitle) => {

    const todo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,

    }
    setTodoList(previous => [todo, ...previous])

  }

  
  const completeTodo = (id) => {
    // loop through the array "todoList" using "previous" and find the todo with the matching id
    // using object spreading to create a new object with the updated isCompleted property set to true
    setTodoList(previous => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo))
  }

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...todo, ...editedTodo} : todo)
    setTodoList(updatedTodos)
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    
    </div>
  )
}

export default App
