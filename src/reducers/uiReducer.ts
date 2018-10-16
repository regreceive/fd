import { IAction } from '../types';

export interface IUi {
  tabId: string;
  freeze: {
    login: number;
    logout: number;
    role: number;
    roles: number;
    postOffer: number;
  };
}

const initState: IUi = {
  tabId: 'home',
  freeze: {
    login: 0,
    logout: 0,
    role: 0,
    roles: 0,
    postOffer: 0,
  },
};

function freeze(state: IUi, key: keyof IUi['freeze']): IUi {
  state.freeze[key] = 1;
  return state;
}

function release(state: IUi, key: keyof IUi['freeze']): IUi {
  state.freeze[key] = 0;
  return state;
}

const global = (state = initState, action: IAction): IUi => {
  switch (action.type) {
    case 'CHANGE_BAR': {
      const tabId = action.payload;
      return { ...state, tabId };
    }
    case 'LOGIN': {
      return freeze(state, 'login');
    }
    case 'LOGOUT': {
      return freeze(state, 'logout');
    }
    case 'GET_AVAILABLE_ROLES': {
      return freeze(state, 'roles');
    }
    case 'UPDATE_ROLE': {
      return freeze(state, 'role');
    }
    case 'POST_OFFER': {
      return freeze(state, 'postOffer');
    }
    case 'LOGIN_COMPLETE': {
      return release(state, 'login');
    }
    case 'LOGOUT_COMPLETE': {
      return release(state, 'logout');
    }
    case 'AVAILABLE_ROLES_COMPLETE': {
      return release(state, 'roles');
    }
    case 'UPDATE_ROLE_COMPLETE': {
      return release(state, 'role');
    }
    case 'POST_OFFER_COMPLETE': {
      return release(state, 'postOffer');
    }
    default:
      return state;
  }
};

export default global;
