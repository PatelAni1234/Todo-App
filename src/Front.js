import Content from "./content";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Front = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId ,setEditId] = useState(0);
  
  const toast = useToast();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);

    setTitle(taskToEdit.title);
    setEditId(id);
 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
    if(editId){
       
      const editObj = tasks.map((i) => i.id===editId ? i = {title ,id:i.id}: {title:i.title ,id:i.id});
      setTasks(editObj);
      setEditId(0);
      setTitle("");
      return;
    }
      const newTask = { title, id: Date.now() };
      if (title === "") {
        toast({
          title: "Can't Add",
          description: "Please Enter all the Fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setTasks([...tasks, newTask]);
        setTitle("");
      }
  };

  return (
    <div className="component1">
      <div className="comp">
        <h1>Todo List</h1>
      </div>
      <div className="component">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="taskInput"
            placeholder="Enter the task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button>{editId ? "Edit" : "Add"}</button>
        </form>
      </div>
      <Content
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Front;
