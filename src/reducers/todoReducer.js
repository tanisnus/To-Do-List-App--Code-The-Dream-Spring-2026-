// Action object
export const TODO_ACTIONS = {
    // Fetch Operations
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',

    // Add Operations
    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',


    COMPLETE_TODO: 'COMPLETE_TODO',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',
    UPDATE_TODO: 'UPDATE_TODO',

    // Filter Operations
    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS',
};

// State object
export const initialTodoState = {
    todoList: [],
    error: '',
    filterError: '',
    isTodoListLoading: true,
    sortBy: 'createdDate',
    sortDirection: 'asc',
    filterTerm: '',
    dataVersion: 0,
  };

  // Reducer function
  export function todoReducer(state, action) {
    switch (action.type){
       
        case TODO_ACTIONS.FETCH_START:
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };
        case TODO_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                isTodoListLoading: false,
                todoList: action.payload,
            };
        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                isTodoListLoading: false,
                error: action.payload,
            };
        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [action.payload.newTodo, ...state.todoList],
                error: '',
            };
        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map((todo) => 
                    todo.id === action.payload.tempId ? action.payload.newTodo : todo
                ),
                dataVersion: state.dataVersion + 1
            };
        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                error: action.payload.message,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload.tempId),
                dataVersion: state.dataVersion + 1,
            }
        case TODO_ACTIONS.COMPLETE_TODO:
            return {
                ...state,
                todoList: state.todoList.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            isCompleted: true,
                        }
                    }
                    return todo;
                }),
                dataVersion: state.dataVersion + 1,
            }
        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map((todo) =>
                    todo.id === action.payload.id ? action.payload.updatedTodo : todo
                ),
                dataVersion: state.dataVersion + 1,
            }
        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                error: action.payload.message,
                todoList: state.todoList.map((todo) =>
                  todo.id === action.payload.id ? { ...todo, isCompleted: false } : todo
                ),
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);


    }
  }