import { IAction } from '../types';

export interface IGlobal {
  toast: string;
  status: {
    login: number;
    role: number;
    roles: number;
  };
}

const initState: IGlobal = {
  toast: '',
  status: {
    login: 0,
    role: 0,
    roles: 0,
  },
};

const global = (state = initState, action: IAction): IGlobal => {
  switch (action.type) {
    case 'CLEAR_TOAST':
    case 'LOGIN_COMPLETE':
    case 'AVAILABLE_ROLES_COMPLETE':
    case 'UPDATE_ROLE_COMPLETE': {
      const { toast } = action.payload;
      if (typeof toast === 'undefined') {
        return state;
      } else {
        return { ...state, toast };
      }
    }
    default:
      return state;
  }
};

export default global;
