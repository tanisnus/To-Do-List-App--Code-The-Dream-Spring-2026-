import { useEffect } from 'react';
import { useReducer } from 'react';
import TodoForm from '../features/Todos/TodoForm';
import TodoList from '../features/Todos/TodoList';
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import useDebounce from '../utils/useDebounce';
import { todoReducer, initialTodoState, TODO_ACTIONS } from '../reducers/todoReducer';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router';
import StatusFilter from '../shared/StatusFilter';

function TodosPage() {
    const { token } = useAuth();
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get status filter from URL, default to 'all'
    const statusFilter = searchParams.get('status') || 'all';  

    const { 
        todoList, 
        error, 
        filterError, 
        isTodoListLoading, 
        sortBy,
        sortDirection,
        filterTerm,
        dataVersion,
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 500);

    


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
          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            payload: { tasks: data.tasks },
          })
        } catch (error) {
          if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
              dispatch({
                type: TODO_ACTIONS.FETCH_ERROR,
                payload: {
                  message: `Error filtering/sorting todos: ${error.message}`,
                  isFilterError: true,
                },
              });
          } else {
              dispatch({
                type: TODO_ACTIONS.FETCH_ERROR,
                payload: {
                  message: `Error fetching todos: ${error.message}`,
                  isFilterError: false,
                },
              });
          }
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
  
    
    const toggleTodoComplete = async (id) => {
      const todo = todoList.find((item) => item.id === id);
      if (!todo) return;

      const previousIsCompleted = todo.isCompleted;
      const isCompleted = !previousIsCompleted;

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO,
        payload: { id, isCompleted },
      });

      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({ isCompleted }),
        });

        if (!response.ok) {
          throw new Error('Failed to update todo');
        }

        const data = await response.json();
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
          payload: { id: data.id, updatedTodo: data },
        });

      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
          payload: { id, isCompleted: previousIsCompleted, message: error.message },
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

      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_ERROR,
          payload: { originalTodo, message: error.message },
        });
      }
    }


  return (
    <div className="bg-gray-50 px-6 py-8 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={(value) => dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: { filterTerm: value } })}
          />
        </div>

        {isTodoListLoading && <p className="mt-4 text-sm text-gray-500">Loading todos...</p>}
        {error && (
          <section className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
              className="mt-2 text-red-700 underline"
            >
              Clear Error
            </button>
          </section>
        )}
        {filterError && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            <p>{filterError}</p>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
                className="text-red-700 underline"
              >
                Clear Filter Error
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
                className="text-red-700 underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <TodoForm onAddTodo={addTodo} />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <StatusFilter />
            <SortBy
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={(event) => dispatch({ type: TODO_ACTIONS.SET_SORT, payload: { sortBy: event.target.value, sortDirection } })}
              onSortDirectionChange={(event) => dispatch({ type: TODO_ACTIONS.SET_SORT, payload: { sortBy, sortDirection: event.target.value } })}
            />
          </div>
        </div>

        <div className="mt-4">
          <TodoList
            todoList={todoList}
            onToggleTodoComplete={toggleTodoComplete}
            onUpdateTodo={updateTodo}
            dataVersion={dataVersion}
            statusFilter={statusFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default TodosPage;