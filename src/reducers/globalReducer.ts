import { IAction } from '../types';
import { ILoginComplete } from '../actions/userActions';

export interface IGlobal {
  toast: string;
}

const initState: IGlobal = {
  toast: '',
};

const global = (state = initState, action: IAction): IGlobal => {
  switch (action.type) {
    case 'LOGIN_COMPLETE': {
      const { toast } = action.payload as ILoginComplete;
      return { ...state, toast };
    }
    default:
      return state;
  }
};

export default global;
