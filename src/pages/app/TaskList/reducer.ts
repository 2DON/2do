export interface TaskReducerAction {
  type: 'add' | 'mod' | 'rem';
  payload: Task;
}

export interface TaskReducerOverride {
  override: Task[];
}

function isOverriding(action: any): action is TaskReducerOverride {
  return 'override' in action;
}

function reducer(tasks: Task[], action: TaskReducerAction | TaskReducerOverride) {
  if (isOverriding(action)) {
    return action.override;
  }

  switch(action.type) {
    case 'add':
      return [action.payload, ...tasks]
    case 'mod':
      return tasks.map(task => task.id !== action.payload.id ? task : action.payload)
    case 'rem':
      return tasks.filter(task => task.id !== action.payload.id)
    default:
      return tasks;
  }
}

export default reducer;
