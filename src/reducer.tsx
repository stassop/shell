import { Todo } from './TodoList';

interface State {
  todos: Todo[]
}

export enum Action {
  ADD = 'ADD',
  SAVE = 'SAVE',
  DELETE = 'DELETE',
}

export const initialState: State = {
  todos: [
    {
      id: 1,
      title: 'First todo',
    },
    {
      id: 2,
      title: 'Second todo',
    },
    {
      id: 3,
      title: 'Third todo',
    }
  ]
};

export const rootReducer = (state: State, action: any) => {
  switch (action.type) {
    case Action.ADD:
      return {
        todos: [{ id: state.todos.length + 1, title: 'New todo' }, ...state.todos]
      }
    case Action.SAVE:
      return {
        todos: state.todos.map((todo: Todo) => todo.id === action.id ? { ...todo, title: action.text } : todo)
      }
    case Action.DELETE:
      return {
        todos: state.todos.filter((todo: Todo) => todo.id !== action.id)
      }
    default:
      throw new Error();
  }
}
