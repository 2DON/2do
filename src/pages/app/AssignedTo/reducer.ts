export interface ProjectMemberReducerAction {
  type: 'add' | 'mod' | 'rem';
  payload: ProjectMember;
}

export interface ProjectMemberReducerOverride {
  override: ProjectMember[];
}

function isOverriding(action: any): action is ProjectMemberReducerOverride {
  return 'override' in action;
}

function reducer(projectMembers: ProjectMember[], action: ProjectMemberReducerAction | ProjectMemberReducerOverride) {
  if (isOverriding(action)) {
    return action.override;
  }

  switch(action.type) {
    case 'add':
      return [action.payload, ...projectMembers]
    case 'mod':
      return projectMembers.map(projectMember => projectMember.accountId !== action.payload.accountId ? projectMember : action.payload)
    case 'rem':
      return projectMembers.filter(projectMember => projectMember.accountId !== action.payload.accountId)
    default:
      return projectMembers;
  }
}

export default reducer;
