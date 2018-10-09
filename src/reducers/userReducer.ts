import { IAction, IUser } from '../types';
import { ILoginComplete } from '../actions/userActions';

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  token: '', // ''
  username: '',
  type: 0, // -1
  role: 0, // -1
  config: {
    lang,
  },
};

const user = (state = initState, action: IAction): IUser => {
  switch (action.type) {
    case 'LOGIN_COMPLETE': {
      const data = action.payload as ILoginComplete;
      return { ...state, ...data };
    }
    default:
      return state;
  }
};

export default user;
