export const PROFILE_ACTION = '@@redux-devtools-profiler-monitor/PROFILE_ACTION';

export function profileAction(actionType) {
  if (typeof window !== 'undefined') {
    window.profileAction = actionType;
  }
  return { type: PROFILE_ACTION, payload: actionType };
}
