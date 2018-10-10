import { IAction } from '../types';

export interface IGlobal {
  toast: string;
}

const initState: IGlobal = {
  toast: '',
};

const global = (state = initState, action: IAction): IGlobal => {
  switch (action.type) {
    case 'CLEAR_TOAST':
    case 'LOGIN_COMPLETE':
    case 'UPDATE_ROLE_COMPLETE': {
      const { toast } = action.payload;
      return { ...state, toast };
    }
    default:
      return state;
  }
};

export default global;
