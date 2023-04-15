import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const Content = ({ tasks, handleDelete  , handleEdit}) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-details" key={task.id}>
          <div className="title">
            <p>{task.title}</p>
          </div>
           
          <MdModeEditOutline
            id="edit"
            onClick={() => {
              handleEdit(task.id);
            }}
          />
          <MdDelete
            id="del"
            onClick={() => {
              handleDelete(task.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Content;
