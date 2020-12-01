export interface StepReducerAction {
  type: 'add' | 'mod' | 'rem';
  payload: Step;
}

export interface StepReducerOverride {
  override: Step[];
}

function isOverriding(action: any): action is StepReducerOverride {
  return 'override' in action;
}

function reducer(steps: Step[], action: StepReducerAction | StepReducerOverride) {
  if (isOverriding(action)) {
    return action.override;
  }

  switch(action.type) {
    case 'add':
      return [action.payload, ...steps]
    case 'mod':
      return steps.map(step => step.id !== action.payload.id ? step : action.payload)
    case 'rem':
      return steps.filter(step => step.id !== action.payload.id)
    default:
      return steps;
  }
}

export default reducer;
