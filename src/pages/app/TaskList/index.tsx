import React, { useEffect, useReducer } from "react"
import * as AccountService from '../../../services/AccountService'
import * as TaskService from '../../../services/TaskService'
import Task from "../Task"
import reducer from "./reducer"


interface TaskListParams {
  projectId: number;
}

const TaskList: React.FC<TaskListParams> = ({ projectId }) => {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    TaskService
      .index(projectId)
      .then(async _tasks => {
        const accountIds = new Set(_tasks
          .map(task => task.assignedTo)
          .filter(accountId => accountId != null) as number[])

        await AccountService.cached.cacheAll(...accountIds);

        dispatch({ override: _tasks });
      })
  }, [projectId])

  function create(form: HTMLFormElement) {
    TaskService
      .store(projectId, new FormData(form))
      .then(task => {
        dispatch({ type: 'add', payload: task })
        form.reset();
      });
  }

  return (
    <>
      <form className="Task New" onSubmit={e => { e.preventDefault(); create(e.currentTarget) }}>
        <input type="text" name="description" id="description" placeholder="type your new task here..." min="3" />
      </form>
      {tasks.map(task => <Task dispatch={dispatch} key={task.id} projectId={projectId} task={task} />)}
    </>
  )
}

export default TaskList
