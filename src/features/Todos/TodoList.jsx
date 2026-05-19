import TodoListItem from '../../features/TodoList/TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {

  // filter the todoList to only include todos that are not completed
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem 
                key={todo.id} 
                todo={todo} 
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;


