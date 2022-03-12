import React, { useReducer } from 'react';
import TodoList from './TodoList';
import './App.css';

import { Action, rootReducer, initialState } from './reducer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const addTodo = () => {
    dispatch({ type: Action.ADD });
  };

  const onSave = (id: number, text: string) => {
    dispatch({ type: Action.SAVE, id, text });
  };

  const onDelete = (id: number) => {
    dispatch({ type: Action.DELETE, id });
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className="App-title">Todo app</span>
        <button onClick={addTodo}>Add todo</button>
      </header>
      <main>
        <TodoList
          todos={state.todos}
          onSave={onSave}
          onDelete={onDelete}
        />
      </main>
    </div>
  );
};

export default App;
