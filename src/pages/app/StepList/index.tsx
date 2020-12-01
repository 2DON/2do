import React, { useEffect, useReducer } from "react"
import { FiTrash2 } from "react-icons/fi";
import * as StepService from '../../../services/StepService'
import timed from "../../../utils/timed";
import reducer from "../TaskList/reducer";
import './styles.scss'

/**
 * @interface
 * @description set types of StepList's params
 */
interface StepListProps {
  projectId: number;
  taskId: number;
  updateStepCounts: React.Dispatch<React.SetStateAction<[number, number]>>;
}

/**
 * @function
 * @description return a list of steps
 * @param projectId: number
 * @param taskId: number
 * @param updateStepCounts: React.dispatch
 */
const StepList: React.FC<StepListProps> = ({ projectId, taskId, updateStepCounts }) => {
  const [steps, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    StepService
      .index(projectId, taskId)
      .then(steps_ => {
        dispatch({ override: steps_ })
      });
  }, [projectId, taskId])

  // update `'done' of 'total'` on Task
  useEffect(() => {
    const total = steps.length;
    const done = steps.reduce(
      (found, step) => step.status === 'DONE' ? found + 1 : found, 0);
    updateStepCounts([done, total])
  }, [steps]);

  function create(form: HTMLFormElement) {
    StepService
      .store(projectId, taskId, new FormData(form))
      .then(step => {
        dispatch({ type: 'add', payload: step })
        form.reset();
      });
  }

  const update = (stepId: number, form: HTMLFormElement) => {
    StepService
      .update(projectId, taskId, stepId, new FormData(form))
      .then(step => {
        dispatch({ type: 'mod', payload: step })
      })
  }

  const updateTimed = timed(1000, update);

  function destroy(step: Step) {
    StepService
    .destroy(projectId, taskId, step.id)
    .then(() => {
      dispatch({ type: 'rem', payload: step})
    })
  }

  return (
    <>
      <form className="Step New" onSubmit={e => { e.preventDefault(); create(e.currentTarget) }} >
        <input placeholder="type your new step here..." name="description" min="3" />
      </form>
      {steps.map(step => <form
        className="Step"
        key={step.id}
        onSubmit={e => e.preventDefault()}
        onChange={e => updateTimed(step.id, e.currentTarget)}
      >
        <input type="text" name="description" defaultValue={step.description} />
        <select name="status" defaultValue={step.status}>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <FiTrash2 name="delete" onClick={() => destroy(step)} />
      </form>)}
    </>
  )
}

export default StepList
