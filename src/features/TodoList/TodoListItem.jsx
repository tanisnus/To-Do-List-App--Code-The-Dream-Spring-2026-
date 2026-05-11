import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  const handleEdit = (e) => {
    setWorkingTitle(e.target.value);

  }

  const handleUpdate = (e) => {
    if (isEditing === false) {
      return
    }

    e.preventDefault()
    onUpdateTodo({...todo, title: workingTitle})
    setIsEditing(false)
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
            <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button 
                  type="button" 
                  onClick={handleUpdate}
                  disabled={!isValidTodoTitle(workingTitle)}
                  > Update </button>
            </>
         
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}
