import { useState } from 'react';
import { useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import SortBy from '../../shared/SortBy';
import FilterInput from '../../shared/FilterInput';
import useDebounce from '../../utils/useDebounce';

function TodosPage({token}) {

    const [todoList, setTodoList] = useState([]);

    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState('creationDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);


    useEffect(() => {
      // If the token is not set, don't fetch the todos
      if (!token) {
        return;
      }

      async function fetchTodos() {
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        try {
          setIsTodoListLoading(true);
          setError('');

          // Call the API
          const response = await fetch(`/api/tasks?${params}`, {
            headers: { 'X-CSRF-TOKEN': token },
            credentials: 'include',
          });

          // Handle status before parsing JSON
          if (response.status === 401) {
            throw new Error('unauthorized');
          }

          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }

          const data = await response.json();
          setTodoList(data.tasks);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsTodoListLoading(false);
        }
      }

      fetchTodos();
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  
    // This is a callback function that is passed to the TodoForm component
    // This callback function updates the todoList state 
    const addTodo = async (todoTitle) => {

      const tempId = Date.now();
      const todo = {
        id: tempId,
        title: todoTitle,
        isCompleted: false,
      };
      setTodoList(previous => [todo, ...previous]);

      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({ title: todoTitle, isCompleted: false }),
        });

        if (!response.ok) {
          throw new Error('Failed to add todo');
        }

        const data = await response.json();

        // Go through every todo in the list.
        // If this one's id matches the fake id → use the server's version.
        // Otherwise → leave it alone.
        setTodoList(previous =>
          previous.map(item => (item.id === tempId ? data : item))
        );
      } catch (error) {
        setTodoList(previous => previous.filter(item => item.id !== tempId));
        setError(error.message);
      }
    }
  
    
    const completeTodo = async (id) => {
      const originalTodo = todoList.find(todo => todo.id === id);

      if (!originalTodo) {
        return;
      }

      setTodoList(previous =>
        previous.map(todo =>
          todo.id === id ? { ...todo, isCompleted: true } : todo
        )
      );

      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({ isCompleted: true }),
        });

        if (!response.ok) {
          throw new Error('Failed to complete todo');
        }

        const data = await response.json();
        setTodoList(previous =>
          // Go through every todo in the list.
          // If this one's id matches the id of the todo we just completed → use the server's version.
          // Otherwise → leave it alone.
          previous.map(todo => (todo.id === id ? data : todo))
        );
      } catch (error) {
        // Rollback the optimistic update
        // Go through every todo in the list.
        // If this one's id matches the id of the todo we just completed → use the original todo.
        // Otherwise → leave it alone.
        setTodoList(previous =>
          previous.map(todo => (todo.id === id ? originalTodo : todo))
        );
        setError(error.message);
      }
    }

    const updateTodo = async (editedTodo) => {
      const originalTodo = todoList.find(todo => todo.id === editedTodo.id);

      if (!originalTodo) {
        return;
      }

      setTodoList(previous =>
        previous.map(todo =>
          todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
        )
      );

      try {
        const response = await fetch(`/api/tasks/${editedTodo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update todo');
        }

        const data = await response.json();
        setTodoList(previous =>
          // Go through every todo in the list.
          // If this one's id matches the id of the todo we just updated → use the server's version.
          // Otherwise → leave it alone.
          previous.map(todo => (todo.id === editedTodo.id ? data : todo))
        );
      } catch (error) {
        setTodoList(previous =>
          previous.map(todo =>
            todo.id === editedTodo.id ? originalTodo : todo
          )
        );
        setError(error.message);
      }
    }

    const handleFilterChange = (newTerm) => {
      setFilterTerm(newTerm);
    }

  return (
    <div>
      {isTodoListLoading && <p>Loading todos...</p>}
      {error && (
        <section>
          <p>{error}</p>
          <button type="button" onClick={() => setError('')}>
            Clear Error
          </button>
        </section>
      )}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(event) => setSortBy(event.target.value)}
        onSortDirectionChange={(event) => setSortDirection(event.target.value)}
      />
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange} />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  )
}

export default TodosPage;