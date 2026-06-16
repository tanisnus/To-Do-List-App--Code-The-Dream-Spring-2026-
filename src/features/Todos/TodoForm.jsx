import { useRef, useState } from 'react';
import {
  isValidTodoTitle,
  getTodoTitleError,
  MAX_TODO_TITLE_LENGTH,
} from '../../utils/todoValidation';
import { sanitizeInput } from '../../utils/sanitize';

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');
    const [error, setError] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();
        setError('');

        const titleError = getTodoTitleError(workingTodoTitle);
        if (titleError) {
            setError(titleError);
            return;
        }

        const cleanTitle = sanitizeInput(workingTodoTitle);
        if (!cleanTitle) {
            setError('Todo title contains invalid characters.');
            return;
        }

        onAddTodo(cleanTitle);
        setWorkingTodoTitle('');
        inputRef.current.focus();
    };

    return (
        <form onSubmit={handleAddTodo} className="flex flex-col gap-2">
            <div className="flex gap-3">
                <input
                    id="todoTitle"
                    ref={inputRef}
                    type="text"
                    value={workingTodoTitle}
                    maxLength={MAX_TODO_TITLE_LENGTH}
                    onChange={(event) => {
                        setWorkingTodoTitle(event.target.value);
                        if (error) setError('');
                    }}
                    placeholder="Add a new task..."
                    className="flex-1 rounded-lg border border-indigo-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
                />
                <button
                    type="submit"
                    disabled={!isValidTodoTitle(workingTodoTitle)}
                    className="flex items-center gap-1 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                >
                    <span>+</span>
                    Add Todo
                </button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
    );
}

export default TodoForm;
