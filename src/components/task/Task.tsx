import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import * as TaskService from '../../services/TaskService'
import * as AccountService from '../../services/AccountService'
import './Task.scss';

let acc: PublicAccount | undefined;
AccountService.find(1).then(pa => (acc = pa[0]));

const TaskStatus: React.FC<{id: number, status: TaskStatus, onChange?:(event: React.ChangeEvent<HTMLSelectElement>) => void}> = ({id, status, onChange}) => {
  return (
    <select name="status" id="status" defaultValue={status} onChange={onChange}>       
      <option value="IN_PROGRESS">IN PROGRESS</option>       
      <option value="DONE">DONE</option>
    </select>
  )
}

const Task: React.FC<{projectId: number, task: Task}> = ({ projectId, task: _task }) => {
  const [checked, setChecked] = useState(false);
  const [changed, setChanged] = useState(false);

  const [task, setTask] = useState(_task);

  function showButtons<T>(__: React.ChangeEvent<T>): void {
    if (!changed) setChanged(true);
  }

  function save(form: HTMLFormElement) {
    TaskService
      .uptade(projectId, task.id, new FormData(form))
      .then(task => {
        setChanged(false)
        setTask(task)
        _task = task
      })
      .catch(() => {
        setChanged(false);
      });
  }

  return (
    <form className="Task" onSubmit={e => {e.preventDefault(); save(e.currentTarget)}}>
      <div className="base">
        <IoIosArrowUp onClick={() => setChecked(!checked)} className={`dropdown ${checked ? 'checked' : ''}`}/>
        <section className="text">
          <input onChange={showButtons} type="text" name="description" id="description" defaultValue={task.description} />
          <span>5 of 12 {checked && task.assignedTo ? '' : `, assigned to ${acc?.name}`}</span>
        </section>
        <section className="status">
          {checked || changed
            ? <div className="actions">
                <button type="reset"><FcCancel /></button>
                <button type="submit"><FcCheckmark/></button>
              </div> 
            : <span>1 of 5</span>}
          <TaskStatus onChange={showButtons} id={task.id} status={task.status} />
        </section>
      </div>
      {checked && <>
        <div className="editor">
          <span>assigned to {acc?.name}</span>
        </div>
      </>}
    </form>
  );
}

export const Container = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    TaskService
      .index(5)
      .then(_tasks => {
        setTasks(_tasks);
      })
  }, [])

  return (
    <main>
      {tasks.map(task => <Task key={task.id} projectId={5} task={task} />)}
    </main>
  );
}

export default Task;
