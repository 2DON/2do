import React from "react";

interface TaskStatusProps {
  status: TaskStatus,
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const TaskStatus: React.FC<TaskStatusProps> = ({ status, onChange }) => {
  return (
    <select
      className="TaskStatus"
      name="status"
      defaultValue={status}
      onChange={onChange}
    >
      <option value="IN_PROGRESS">IN PROGRESS</option>
      <option value="DONE">DONE</option>
    </select>
  )
}

export default TaskStatus;
