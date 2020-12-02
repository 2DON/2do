import React, { useEffect, useReducer, useState } from "react"
import { FiTrash2 } from "react-icons/fi";
import * as AccountService from '../../../services/AccountService'
import * as ProjectService from '../../../services/ProjectService'
import * as TaskService from '../../../services/TaskService'
import * as ProjectMemberService from '../../../services/ProjectMemberService';
import timed from "../../../utils/timed";
import reducer from "./reducer";
import './styles.scss'

interface AssignedToProps {
  projectId: number;
  taskId: number;
  updateStepCounts: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const AssignedTo: React.FC<AssignedToProps> = ({ projectId, taskId, updateStepCounts }) => {
  const [projectMembers, dispatchProjectMembers] = useReducer(reducer, []);
  const [accounts, setAccounts] = useState<Map<number, PublicAccount>>(new Map())

  useEffect(() => {
    ProjectMemberService
      .index(projectId)
      .then(async members_ => {
        const accounts_ = await AccountService
          .cached
          .findAndCacheAll(...members_.map(member => member.accountId))

        setAccounts(accounts_);
        dispatchProjectMembers({override: members_});
      })
  }, [])

  function changeAssigned(form: HTMLFormElement){
    TaskService.update(projectId, taskId, new FormData(form));
  }

  const update = (taskId:number, form: HTMLFormElement) => {
    TaskService
      .update(projectId, taskId, new FormData(form));
  }

  const updateTimed = timed(1000, update);

  return (
    <>
      <form
        className="Assign"
        onSubmit={e => e.preventDefault()}
        onChange={e => updateTimed(taskId, e.currentTarget)}
      >
        <input list="assignedTo" type="text" name="assignedTo" defaultValue={projectMembers.length > 0 ? accounts.get(projectMembers[0].accountId)?.name : undefined} />
        <datalist id="assignedTo" defaultValue={projectMembers.length > 0? projectMembers[0]?.accountId : undefined}>
          {projectMembers.map(projectMember => <option value={projectMember.accountId}>{accounts.get(projectMember.accountId)?.name}</option>)}
        </datalist>
      </form>
    </>
  )
}

export default AssignedTo;
