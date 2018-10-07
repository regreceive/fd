import { IAction, IUser } from '../types';

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  token: '', // ''
  username: '',
  type: -1, // -1
  role: 0, // -1
  config: {
    lang,
  },
};

const user = (state = initState, action: IAction): IUser => {
  switch (action.type) {
    case 'USER.USER_DATA_COMPLETE': {
      const role = action.payload as number;
      return { ...state, role };
    }
    default:
      return state;
  }
};

export default user;
