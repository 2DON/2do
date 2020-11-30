import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import * as TaskService from '../../../services/TaskService'
import * as AccountService from '../../../services/AccountService'
import * as StepService from '../../../services/StepService'
import { TaskReducerAction, TaskReducerOverride } from '../TaskList/reducer';
import timed from '../../../utils/timed';
import './styles.scss';

const TaskStatus: React.FC<{ id: number, status: TaskStatus, onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ id, status, onChange }) => {
  return (
    <select name="status" id="status" defaultValue={status} onChange={onChange}>
      <option value="IN_PROGRESS">IN PROGRESS</option>
      <option value="DONE">DONE</option>
    </select>
  )
}

const Task: React.FC<{ projectId: number, task: Task, dispatch: React.Dispatch<TaskReducerAction | TaskReducerOverride>; }> = ({ dispatch, projectId, task: _task }) => {
  const [checked, setChecked] = useState(false);
  const [changed, setChanged] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);


  const updateStep = (stepId: number, form: HTMLFormElement) => {
    StepService.update(projectId, task.id, stepId, new FormData(form))
  }

  const updateStepTimed = timed(1000, updateStep);

  const stepChanged = (stepId: number, event: React.FormEvent<HTMLFormElement>) => {
    updateStepTimed(stepId, event.currentTarget)
  }

  const [task, setTask] = useState(_task);
  const [assignedTo, setAssignedTo] = useState<PublicAccount | undefined>()

  useEffect(() => {
    if (task.assignedTo)
      setAssignedTo(AccountService.cached.get(task.assignedTo));
    StepService.index(projectId, task.id).then(setSteps);
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

  function saveSteps(form: HTMLFormElement) {
    StepService
      .store(projectId, task.id, new FormData(form))
      .then(step => {
        setSteps([step, ...steps])
        form.reset();
      });
  }

  function destroy(stepId: number) {
    StepService.destroy(projectId, task.id, stepId).then(() => {
      setSteps(steps.filter(step => stepId !== step.id))
    })
  }

  function destroyTask() {
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
          {checked && <span>{steps.filter(step => step.status === "DONE").length} of {steps.length} {!checked && task.assignedTo ? `, assigned to ${assignedTo?.name}` : ''}</span>}
        </section>
        <section className="status">
          {checked || changed
            ? <div className="actions">
              <button><FiTrash2 onClick={destroyTask} /> </button>
              <button type="reset"><FcCancel /></button>
              <button type="submit"><FcCheckmark /></button>
            </div>
            : <span>{steps.filter(step => step.status === "DONE").length} of {steps.length} {!checked && task.assignedTo ? `, assigned to ${assignedTo?.name}` : ''}</span>}
          <TaskStatus onChange={showButtons} id={task.id} status={task.status} />
        </section>
      </form>
      {checked && <>
        <div className="editor">
          <span>assigned to {assignedTo?.name}</span>
        </div>
        <form onSubmit={e => { e.preventDefault(); saveSteps(e.currentTarget) }} className="NewStep">
          <input placeholder="New Step" name="description" id="description" min="3" ></input>
        </form>
        {steps.map(step => <form key={step.id} className="Step" onChange={e => stepChanged(step.id, e)}>
          <input type="text" name="description" id="description" defaultValue={step.description} />
          <select name="status" id="status" defaultValue={step.status}>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <FiTrash2 name="delete" className="img" onClick={() => destroy(step.id)} />
        </form>)}
      </>}
    </div >
  );
}

export default Task;
