import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import { useEditableTitle } from '../../hooks/useEditableTitle';

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const { isEditing, workingTitle, startEditing, cancelEdit, updateTitle, finishEdit } = useEditableTitle(todo.title);

  const handleCancel = () => {
    cancelEdit();
  }

  const handleEdit = (e) => {
    updateTitle(e.target.value);

  }

  const handleUpdate = (e) => {
    if (isEditing === false) {
      return
    }

    e.preventDefault()
    onUpdateTodo({...todo, title: workingTitle})
    finishEdit()
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
            <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit} />

                {/* Cancle Button */}
                <button type="button" onClick={handleCancel}>Cancel</button>

                {/* Update Button */}
                <button 
                  type="button" 
                  onClick={handleUpdate}
                  disabled={!isValidTodoTitle(workingTitle)}
                  > Update 
                </button>
            </>
         
        ) : (
          <>
            <label>
              {/* Checkbox */}
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}
