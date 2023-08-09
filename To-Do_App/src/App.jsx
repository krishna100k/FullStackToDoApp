import axios from "axios";
import "./App.css";
import close from "./assets/close.svg";
import edit from "./assets/edit.svg";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState([]);
  const [modalStyle, setModalStyle] = useState({ visibility: "hidden" });

  const randomNumber = Math.floor(Math.random()*15);
  
  useEffect(() => {
    const getQuote = () => {
      axios.get("https://type.fit/api/quotes").then((response) => {
        console.log(response.data);
        setQuote(response.data[randomNumber].text);
      });
    };
    getQuote();

    const fetchData = () => {
      axios
        .get("https://todo-rest-b40p.onrender.com/todos")
        .then((res) => {
          console.log(res.data);
          setTodos(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();

    setInterval(fetchData, 1000);
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Patch Request
  // const [patchTitle, setPatchTitle] = useState("");
  // const [patchDescription, setPatchDescription] = useState("");
  // const handlePatchTitle = (e) => {
  //   setPatchTitle(e.target.value);
  // };
  // const handlePatchDescription = (e) => {
  //   setPatchDescription(e.target.value);
  // };

  // const submitPatch = (id) => {
  //   axios
  //     .patch(`http://localhost:5000/todos/${id}`, {
  //       title: patchTitle,
  //       description: patchDescription,
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };
  //

  //Grabbing Title and Description from Inputs
  const titleGrabber = (e) => {
    let title = e.target.value;
    setTitle(title);
  };
  const descriptionGrabber = (e) => {
    let description = e.target.value;
    setDescription(description);
  };

  //Submit Button Function
  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please enter a title");
    } else if (description === "") {
      alert("Please enter a description");
    } else {
      let newTodo = {
        title: title,
        description: description,
      };

      axios
        .post("https://todo-rest-b40p.onrender.com/todos", newTodo)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    alert(`Added ${title}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://todo-rest-b40p.onrender.com/todos/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const modalHandler = () => {
    setModalStyle({ visibility: "visible" });
  };



  return (
    <div className="main">
      <h1 className="heading">Another New Todo App</h1>
      <div className="leftPart">
        <div className="quote-box">
          <h1>{quote}</h1>
        </div>
        <form className="form" action="POST">
          <div className="inputs">
            <input
              className="title"
              onChange={titleGrabber}
              type="text"
              placeholder="Enter a Title"
            />
            <input
              className="description"
              onChange={descriptionGrabber}
              type="text"
              placeholder="Enter a Description"
            />
          </div>
          <div className="submitButton">
            <button onClick={submitHandler}>Submit</button>
          </div>
        </form>
      </div>

      <div className="rightPart">
        <div className="above-right">
          {todos.map((todo) => {
            return (
              <div className="main-todo" key={todo.id}>
                {/* Modal */}
                <div style={modalStyle} className="modal">
                  <div className="modal-card">
                    <button
                      onClick={() => setModalStyle({ visibility: "hidden" })}
                      className="modal-close"
                    >
                      <img src={close} alt="close" />
                    </button>
                    <input
                      className="title"
                      type="text"
                      placeholder="Enter a Title"
                    />
                    <input
                      className="description"
                      type="text"
                      placeholder="Enter a Description"
                    />
                    <button className="modal-button">Submit</button>
                  </div>
                </div>
                {/* Modal */}
                <div className="todo-info">
                  <h2>{todo.title}</h2>
                  <p>{todo.description}</p>
                </div>
                <div className="todo-button">
                  <button onClick={modalHandler}>
                    <img src={edit} alt="Edit" />
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>
                    <img src={close} alt="close" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
