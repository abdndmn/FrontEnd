import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", completed: true },
    { id: 2, text: "Learn React", completed: false },
    { id: 3, text: "Have a life!", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.trim() === "") return;
              const newTodo = {
                id: Date.now(),
                text: inputValue,
                completed: false,
              };
              setTodos([...todos, newTodo]);
              setInputValue("");
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {}}
                  />
                  <label>{todo.text}</label>
                  <button className="destroy" onClick={() => {}}></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.filter((todo) => !todo.completed).length}</strong>{" "}
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                All
              </a>
            </li>
            <li>
              <a href="#/">Active</a>
            </li>
            <li>
              <a href="#/">Completed</a>
            </li>
          </ul>

          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;