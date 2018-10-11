import { IAction } from '../types';
import { ILoginComplete, IRoleComplete } from '../actions/userActions';

export interface IUser {
  token: string;
  username: string;
  side: '' | 'BUY' | 'SELL';
  role: string;
  config: {
    lang: string;
  };
  status: {
    login: number;
    role: number;
  };
}

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  token: '',
  username: '',
  side: '',
  role: '',
  config: {
    lang,
  },
  status: {
    login: 0,
    role: 0,
  },
};

function freeze(state: IUser, key: keyof IUser['status']): IUser['status'] {
  const status = { ...state.status };
  status[key] = 1;
  return status;
}

function release(state: IUser, key: keyof IUser['status']): IUser['status'] {
  const status = { ...state.status };
  status[key] = 0;
  return status;
}

const user = (state = initState, action: IAction): IUser => {
  switch (action.type) {
    case 'LOGIN': {
      const status = freeze(state, 'login');
      return { ...state, status };
    }
    case 'LOGIN_COMPLETE': {
      let data = action.payload as ILoginComplete & IUser;
      data = { ...data };
      delete data.toast;
      const status = release(state, 'login');
      return { ...state, ...(data as IUser), status };
    }
    case 'CHOOSE_ROLE': {
      const role = action.payload as IUser['role'];
      return { ...state, role };
    }

    case 'UPDATE_ROLE': {
      const status = freeze(state, 'role');
      return { ...state, status };
    }
    case 'UPDATE_ROLE_COMPLETE': {
      const data = action.payload as IRoleComplete & IUser;
      delete data.toast;
      const status = release(state, 'role');
      return { ...state, ...(data as IUser), status };
    }
    default:
      return state;
  }
};

export default user;
