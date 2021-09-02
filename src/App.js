
import './App.css';
import React from 'react';


function Todo({ todo}) {
  const removeToDo = async (todo) => {
    const res = await fetch('http://127.0.0.1:8000/delete/', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": todo
      })
    })
    const data = await res.json()
    console.log(data)
  }


  return (
    <div
      className="todo"
    >
      {todo.content}
      <div>
        <button onClick={() => removeToDo(todo.id)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addToDo }) {
  const [value, setValue] = React.useState();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addToDo(value);
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
    []
  );


  

  const addToDo = async (value) => {
    const res = await fetch('http://127.0.0.1:8000/add/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "content": value
      })
    })
    const data = await res.json()
    console.log(data)
  }

  const getToDo = async () => {
    const res = await fetch('http://127.0.0.1:8000/')
    const data = await res.json()
    console.log(data)
    setTodos(data)
  }
  React.useEffect(() => {
    getToDo()
  }, [])

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo,index) => (
          <Todo
          key={index}
          index={index}
          todo={todo}
        />
        ))}
        <TodoForm addToDo={addToDo} />
      </div>
    </div>
  );
}

export default App;
