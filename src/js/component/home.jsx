import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
		if (inputValue === "") {alert("input task")}
		else {
      setTodos([...todos, {label: inputValue, done: false}]);
      setInputValue("");
    }}
  };
 
const fetchTodos = async () => {  // Getting the todo list via API
  try {
    const response = await axios.get("https://assets.breatheco.de/apis/fake/todos/user/okorenchuk");
    setTodos(response.data);
    } catch (error) {
    console.error(error);
    }
  };

  const createNewUser = async () => {  // This function creates a new user
      try {
        const response =
        await axios.post("https://assets.breatheco.de/apis/fake/todos/user/okorenchuk", []);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleDelete = async () => {  // This function is being used to delete the user
    try {
      await axios.delete("https://assets.breatheco.de/apis/fake/todos/user/okorenchuk");
      // make delete request to API here
    } catch (error) {
      console.error(error);
    }
  };

  const makeUpdate = async (newToDo) => {  // Uploading the list of to dos
		try {
		  await axios.put(
			'https://assets.breatheco.de/apis/fake/todos/user/okorenchuk',
			newToDo
		  );
		  setTodos(newToDo); // Update the API and local state
		} catch (error) {
		  console.log(error);
		}
	}

  return (
    <div className="container">
      <h1>todos</h1>
      <button className="thebutton" onClick={() => createNewUser()}>Create New User</button>
      <button className="thebutton" onClick={() => fetchTodos()}>Fetch List</button>  
      <button className="thebutton" onClick={() => makeUpdate(todos)}>Save List</button>
      <button className="thebutton" onClick={() => handleDelete()}>Delete User</button>
      <ul>
        <li>
		<input
            type="text"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={handleKeyPress}
            placeholder="What needs to be done?"
          />
        </li>
        {todos.length > 0 ? (
        todos.map((t, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="task-item"

          >
            {t.label}
            {hoverIndex === index && (
              <i
                className="fas fa-trash alt"
                onClick={() => handleDelete(index)}
              ></i>
            )}
          </li>
        ))
      ) : (
        <li>No tasks, add a task</li>
      )}
    </ul>
    <div>{todos.length} tasks</div>
  </div>
);
};

export default Home;