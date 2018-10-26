import { IAction } from '../types';

export interface IGlobal {
  token: string;
  toast: string | string[];
}

const initState: IGlobal = {
  token: '',
  toast: '',
};

const global = (state = initState, action: IAction): IGlobal => {
  switch (action.type) {
    case 'CLEAR_TOAST': {
      return { ...state, toast: '' };
    }
    case 'LOGIN_COMPLETE':
    case 'LOGOUT_COMPLETE':
    case 'AVAILABLE_ROLES_COMPLETE':
    case 'UPDATE_ROLE_COMPLETE':
    case 'CURRENT_STATE_COMPLETE':
    case 'PRODUCER_SUMMARY_COMPLETE':
    case 'POST_OFFER_COMPLETE':
    case 'POST_TIME_COMPLETE':
    case 'QUOTE_PRICE_COMPLETE':
    case 'PRICE_CONSTITUTE_COMPLETE': {
      const { toast } = action.payload;
      let { token } = action.payload;
      if (typeof token === 'undefined') {
        token = state.token;
      }

      return {
        ...state,
        token: token || '',
        toast: toast || '',
      };
    }
    default:
      return state;
  }
};

export default global;
