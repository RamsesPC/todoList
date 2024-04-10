import React, {useState,useEffect} from "react";
import "./App.css";

const App = () => {

    const [todos, setTodos] = React.useState([]);
    const [theme, setTheme] = useState("light"); // Estado para controlar el tema
    const [todoEditing, setTodoEditing] = React.useState(null);

    useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

// Add the handlesubmit code here
  
  /*
  captura el contenido del campo de texto, 
  crea una nueva tarea con un identificador 
  único y la añade a la lista de tareas existentes, 
  siempre que el contenido no esté vacío.
  Si el contenido está vacío, se muestra una alerta 
  al usuario. Finalmente, la función limpia el campo de 
  texto para que se pueda añadir una nueva tarea.

  */
  

  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {

        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }

  // Add the deleteToDo code here

  /*
  toma el identificador de una tarea y crea una copia del listado 
  actual de tareas. Filtra la copia para eliminar la tarea que coincida 
  con el identificador y actualiza la lista original con la versión filtrada, 
  eliminando así la tarea de la lista.
  */ 

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here

  /*
  toma el identificador de una tarea y crea una copia del listado actual de tareas. 
  Recorre la copia y si encuentra la tarea que coincide con el identificador, 
  cambia su estado (marcada o no completada). Finalmente, actualiza la lista original 
  con la versión modificada, cambiando el estado de la tarea en la lista.
  */ 

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Add the submitEdits code here

  /*
   toma la información actualizada de una tarea. 
   Crea una copia del listado de tareas, busca la tarea por su id 
   y actualiza su texto con el nuevo valor. Finalmente, 
   actualiza la lista original con la versión modificada y deja de indicar 
   que se está editando una tarea.
  */

  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    return (
    <div id="todo-list" className={theme}>
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id = 'todoAdd'
            />
            <button type="submit">Add Todo</button>
          </form>
        {todos.map((todo) => (

          <div key={todo.id} className="todo">
            <div className="todo-text">
              {/* Add checkbox for toggle complete */}
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {/* if it is edit mode, display input box, else display text */}
              {todo.id === todoEditing ?
                (<input
                  type="text"
                  id = {todo.id}
                  defaultValue={todo.text}
                />) :
                (<div>{todo.text}</div>)
              }
            </div>
            <div className="todo-actions">
              {/* if it is edit mode, allow submit edit, else allow edit */}
              {todo.id === todoEditing ?
              (
                <button onClick={() => submitEdits(todo)}>Submit Edits</button>
              ) :
              (
                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
             </div>

          </div>
        ))}
          <button onClick={toggleTheme} className="theme-toggle"> Cambiar tema </button>
        </div>
          
      );
    };

export default App;