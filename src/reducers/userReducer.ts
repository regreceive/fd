import { IAction } from '../types';
import {
  IAvailableRolesComplete,
  ILoginComplete,
  IRoleComplete,
} from '../actions/userActions';

export interface IUser {
  token: string;
  username: string;
  side: '' | 'BUY' | 'SELL';
  role: string;
  roles: Array<{ role: string; available: boolean; side: 'SELL' | 'BUY' }>;
  config: {
    lang: string;
  };
}

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  token: '',
  username: '',
  side: '',
  role: '',
  roles: [],
  config: {
    lang,
  },
};

const user = (state = initState, action: IAction): IUser => {
  switch (action.type) {
    case 'LOGIN_COMPLETE': {
      let data = action.payload as ILoginComplete & IUser;
      data = { ...data };
      delete data.toast;
      return { ...state, ...(data as IUser) };
    }
    case 'AVAILABLE_ROLES_COMPLETE': {
      const data = action.payload as IAvailableRolesComplete & IUser;
      delete data.toast;
      return { ...state, ...(data as IUser) };
    }
    case 'UPDATE_ROLE_COMPLETE': {
      const data = action.payload as IRoleComplete & IUser;
      delete data.toast;
      return { ...state, ...(data as IUser) };
    }
    default:
      return state;
  }
};

export default user;
