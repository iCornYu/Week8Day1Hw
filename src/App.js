
import './App.css';
import React from 'react';


function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}



function App() {
  const [todos, setTodos] = React.useState(
    ['OK',"WTF"]
  );

  // const addTodo = text => {
  //   const newTodos = [...todos, { text }];
  //   setTodos(newTodos);
  // };
  // const completeTodo = index => {
  //   const newTodos = [...todos];
  //   newTodos[index].isCompleted = true;
  //   setTodos(newTodos);
  // };
  
  // const removeTodo = index => {
  //   const newTodos = [...todos];
  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };
  const getToDo = async() => {
    const res = await fetch('http://127.0.0.1:8000/')
    const data = await res.json()
    console.log(data)
    setTodos(data)
  }
  React.useEffect(()=>{
    getToDo()
  }, [])

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id}>
          <p>{todo.content}</p>  
          </div>
        ))}
        {/* <TodoForm addTodo={addTodo} /> */}
      </div>
    </div>
  );
}

export default App;
