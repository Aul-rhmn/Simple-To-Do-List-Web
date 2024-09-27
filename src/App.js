import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Fade } from "react-awesome-reveal";

import "./App.css";

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (editIndex !== null) {
      let updatedTodos = [...allTodos];
      updatedTodos[editIndex] = {
        title: newTitle,
        description: newDesc,
      };
      setTodos(updatedTodos);
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));
      setEditIndex(null);
    } else {
      let newTodoItem = {
        title: newTitle,
        description: newDesc,
      };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    }

    setNewTitle("");
    setNewDesc("");
  };

  const handleEditTodo = (index) => {
    setNewTitle(allTodos[index].title);
    setNewDesc(allTodos[index].description);
    setEditIndex(index);
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (saved) {
      setTodos(saved);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleDelete = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  };

  return (
    <div className="App">
      <Fade delay={100}>
        <div className="web-title">
          <h1>To Do List</h1>
        </div>
      </Fade>
      <Fade direction="up" delay={200}>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task Title"
              />
            </div>
            <div className="input-item">
              <label>Descriptions</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Description Task"
              />
            </div>
            <div className="input-btn">
              <button
                className="primaryBtn"
                onClick={handleAddTodo}
                type="button"
              >
                Add
              </button>
            </div>
          </div>

          <div className="btn-area">
            <button
              className={`secondaryBtn ${isCompleted === false && "active"}`}
              onClick={() => setIsCompleted(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${isCompleted === true && "active"}`}
              onClick={() => setIsCompleted(true)}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {isCompleted === false &&
              allTodos.map((item, index) => {
                return (
                  <Fade key={index} delay={index * 200}>
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className="icon-container">
                        <MdEdit
                          className="edit-icon"
                          onClick={() => handleEditTodo(index)}
                        />

                        <MdDeleteForever
                          className="icon"
                          onClick={() => handleDelete(index)}
                        />
                        <BsCheck2All
                          className="check-icon"
                          onClick={() => handleCompleted(index)}
                        />
                      </div>
                    </div>
                  </Fade>
                );
              })}

            {isCompleted === true &&
              completedTodos.map((item, index) => {
                return (
                  <Fade key={index} delay={index * 200}>
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>
                          Completed on <em>{item.completedOn}</em>
                        </p>
                      </div>
                      <div className="icon-container">
                        <MdDeleteForever
                          className="icon"
                          onClick={() => handleDeleteCompletedTodo(index)}
                          title="Delete?"
                        />
                      </div>
                    </div>
                  </Fade>
                );
              })}
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default App;
