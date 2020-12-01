import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import * as TaskService from '../../../services/TaskService'
import * as AccountService from '../../../services/AccountService'
import { TaskReducerAction, TaskReducerOverride } from '../TaskList/reducer';
import './styles.scss';
import TaskStatus from './status';
import StepList from '../StepList';

/**
 * @description returns the task of a project's step
 * @param dispatch
 * @param projectId
 * @param task: _task
 * @return React.FC
 */
const Task: React.FC<{ projectId: number, task: Task, dispatch: React.Dispatch<TaskReducerAction | TaskReducerOverride>; }> = ({ dispatch, projectId, task: _task }) => {
  const [checked, setChecked] = useState(false);
  const [changed, setChanged] = useState(false);

  const [task, setTask] = useState(_task);
  const [assignedTo, setAssignedTo] = useState<PublicAccount | undefined>()

  const [[done, total], updateStepCounts] = useState<[number, number]>([0, 0])

  useEffect(() => {
    if (task.assignedTo)
      setAssignedTo(AccountService.cached.get(task.assignedTo));
  }, [task])

  function showButtons<T>(__: React.ChangeEvent<T>): void {
    if (!changed) setChanged(true);
  }

  function update(form: HTMLFormElement) {
    TaskService
      .update(projectId, task.id, new FormData(form))
      .then(_task => {
        setChanged(false)
        dispatch({ type: 'mod', payload: _task })
        setTask(_task)
      })
      .catch(() => {
        setChanged(false);
        form.reset();
      });
  }

  function destroy() {
    TaskService.destroy(projectId, task.id).then(() => {
      dispatch({ type: 'rem', payload: task })
    });
  }

  return (
    <div className="Task" >
      <form className="base" onSubmit={e => { e.preventDefault(); update(e.currentTarget) }}>
        <IoIosArrowUp onClick={() => setChecked(!checked)} className={`dropdown ${checked ? 'checked' : ''}`} />
        <section className="text">
          <input onChange={showButtons} type="text" name="description" id="description" defaultValue={task.description} />
          {checked && <span>{done} of {total} {!checked && task.assignedTo ? `, assigned to ${assignedTo?.name}` : ''}</span>}
        </section>
        <section className="status">
          {(checked || changed)
            && <div className="actions">
              <button><FiTrash2 onClick={destroy} /> </button>
              <button type="reset"><FcCancel /></button>
              <button type="submit"><FcCheckmark /></button>
            </div>}
          <TaskStatus onChange={showButtons} status={task.status} />
        </section>
      </form>
      {checked && <>
        <div className="editor">
          <span>assigned to {assignedTo?.name}</span>
        </div>
        <StepList projectId={projectId} taskId={task.id} updateStepCounts={updateStepCounts} />
      </>}
    </div >
  );
}

export default Task;
