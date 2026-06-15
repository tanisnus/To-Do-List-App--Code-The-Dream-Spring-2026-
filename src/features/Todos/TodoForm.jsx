import { useRef, useState } from 'react';
import { isValidTodoTitle } from '../../utils/todoValidation';

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (workingTodoTitle) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleAddTodo} className="flex gap-3">
            <input
                id="todoTitle"
                ref={inputRef}
                type="text"
                value={workingTodoTitle}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
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
        </form>
    );
}

export default TodoForm;
