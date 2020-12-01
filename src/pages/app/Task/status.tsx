import React from "react";

/**
 * @interface
 * @description properties of a task status
 */
interface TaskStatusProps {
  status: TaskStatus,
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

/**
 * @description status of a task, with progress and other data
 * @param status
 * @param onChange
 */
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
