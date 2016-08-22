import { PROFILE_ACTION } from './actions';

export default function reducer(props, state = {}, action) {
  const currentProfileAction = state.profileAction || '';
  return {
    profileAction: action.type === PROFILE_ACTION ? action.payload : currentProfileAction,
  };
}
