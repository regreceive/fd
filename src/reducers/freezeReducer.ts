import { IAction } from '../types';

export interface IFreeze {
  login: number;
  role: number;
  roles: number;
}

const initState: IFreeze = {
  login: 0,
  role: 0,
  roles: 0,
};

function freeze(state: IFreeze, key: keyof IFreeze): IFreeze {
  state[key] = 1;
  return state;
}

function release(state: IFreeze, key: keyof IFreeze): IFreeze {
  state[key] = 0;
  return state;
}

const freezeReducer = (state = initState, action: IAction): IFreeze => {
  switch (action.type) {
    case 'LOGIN': {
      return freeze(state, 'login');
    }
    case 'GET_AVAILABLE_ROLES': {
      return freeze(state, 'roles');
    }
    case 'UPDATE_ROLE': {
      return freeze(state, 'role');
    }
    case 'LOGIN_COMPLETE': {
      return release(state, 'login');
    }
    case 'AVAILABLE_ROLES_COMPLETE': {
      return release(state, 'roles');
    }
    case 'UPDATE_ROLE_COMPLETE': {
      return release(state, 'role');
    }
    default:
      return state;
  }
};

export default freezeReducer;
