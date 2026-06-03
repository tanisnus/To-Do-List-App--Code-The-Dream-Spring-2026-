import { useState } from 'react';
import { useEffect } from 'react';
import {useCallback} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import SortBy from '../../shared/SortBy';
import FilterInput from '../../shared/FilterInput';
import useDebounce from '../../utils/useDebounce';

function TodosPage({token}) {

    const [todoList, setTodoList] = useState([]);

    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterTerm, setFilterTerm] = useState('');
    const debouncedFilterTerm = useDebounce(filterTerm, 300);
    const [dataVersion, setDataVersion] = useState(0);
    const [filterError, setFilterError] = useState('');


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
          dispatch({
            type: TODO_ACTIONS.FETCH_START,
          })

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
          setFilterError('');
          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            
          })
        } catch (error) {
          if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
            setFilterError(`Error filtering/sorting todos: ${error.message}`);
          } else {
            setError(`Error fetching todos: ${error.message}`);
          }
        } finally {
          setIsTodoListLoading(false);
        }
      }

      fetchTodos();
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);
  
    // This is a callback function that is passed to the TodoForm component
    // This callback function updates the todoList state 
    const addTodo = async (todoTitle) => {

      // Create a temporary id for the new todo
      
      const tempId = Date.now();
      const todo = {
        id: tempId,
        title: todoTitle,
        isCompleted: false,
      };
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_START,
        payload: {newTodo: todo},

      });

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
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_SUCCESS,
          payload: {
            tempId,
            newTodo: data,
          },
        });
        invalidateCache();
      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.ADD_TODO_ERROR,
          payload: {
            tempId,
            message: error.message,
          },
        });
      }
    }
  
    
    const completeTodo = async (id) => {

      // Optimistic update by marking the todo as completed before the API call completes
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO,
        payload: { id },
      });

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
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
          payload: { id: data.id, updatedTodo: data },
        });
        invalidateCache();

      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
          payload: { id, message: error.message },
        });
      }
    }

    const updateTodo = async (editedTodo) => {
      const originalTodo = todoList.find(todo => todo.id === editedTodo.id);

      
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO,
        payload: { id: editedTodo.id, updatedTodo: editedTodo },
      });

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
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
          payload: { id: data.id, updatedTodo: data },
        });
        invalidateCache();

      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_ERROR,
          payload: { originalTodo, message: error.message },
        });
      }
    }

    const handleFilterChange = (newTerm) => {
      setFilterTerm(newTerm);
    };

    const handleResetFilters = () => {
      dispatch({
        type: TODO_ACTIONS.SET_FILTER,
        payload: { filterTerm: '' },
      });
      dispatch({
        type: TODO_ACTIONS.RESET_FILTERS,
      });
      dispatch({
        type: TODO_ACTIONS.SET_SORT,
        payload: { sortBy: 'createdAt', sortDirection: 'desc' },
      });
      dispatch({
        type: TODO_ACTIONS.CLEAR_ERROR,
      });
    };

    const invalidateCache = useCallback(() => {
      setDataVersion(prev => prev + 1);
      // console.log('Invalidating memo cache after todo mutation');
    }, []);

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
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button type="button" onClick={() => setFilterError('')}>
            Clear Filter Error
          </button>
          <button type="button" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      )}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(event) => setSortBy(event.target.value)}
        onSortDirectionChange={(event) => setSortDirection(event.target.value)}
      />
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange} />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}

export default TodosPage;