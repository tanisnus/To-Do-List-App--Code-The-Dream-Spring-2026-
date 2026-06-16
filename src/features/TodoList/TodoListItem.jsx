import { useState } from 'react';
import { useEditableTitle } from '../../hooks/useEditableTitle';
import {
  isValidTodoTitle,
  getTodoTitleError,
  MAX_TODO_TITLE_LENGTH,
} from '../../utils/todoValidation';
import { sanitizeInput } from '../../utils/sanitize';

export default function TodoListItem({ todo, onToggleTodoComplete, onUpdateTodo }) {
  const { isEditing, workingTitle, startEditing, cancelEdit, updateTitle, finishEdit } = useEditableTitle(todo.title);
  const [editError, setEditError] = useState('');

  const handleUpdate = (e) => {
    if (!isEditing) return;

    e.preventDefault();
    setEditError('');

    const titleError = getTodoTitleError(workingTitle);
    if (titleError) {
      setEditError(titleError);
      return;
    }

    const cleanTitle = sanitizeInput(workingTitle);
    if (!cleanTitle) {
      setEditError('Todo title contains invalid characters.');
      return;
    }

    onUpdateTodo({ ...todo, title: cleanTitle });
    finishEdit();
  };

  const displayTitle = sanitizeInput(todo.title);

  return (
    <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <form onSubmit={handleUpdate} className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <input
                type="text"
                value={workingTitle}
                maxLength={MAX_TODO_TITLE_LENGTH}
                onChange={(e) => {
                  updateTitle(e.target.value);
                  if (editError) setEditError('');
                }}
                className="flex-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
              <button
                type="button"
                onClick={() => {
                  cancelEdit();
                  setEditError('');
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValidTodoTitle(workingTitle)}
                className="rounded-lg bg-[#4F46E5] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Update
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onToggleTodoComplete(todo.id)}
                className="h-5 w-5 shrink-0 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
              />
              <span
                onClick={() => !todo.isCompleted && startEditing()}
                className={`flex-1 text-sm ${
                  todo.isCompleted
                    ? 'text-gray-400 line-through cursor-default'
                    : 'text-gray-800 cursor-pointer'
                }`}
              >
                {displayTitle}
              </span>
            </>
          )}
        </div>
        {editError && <p className="text-sm text-red-600">{editError}</p>}
      </form>
    </li>
  );
}
