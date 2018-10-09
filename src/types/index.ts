import { IGlobal } from '../reducers/globalReducer';
import { IUser } from '../reducers/userReducer';

declare module 'react' {
  // tslint:disable-next-line: interface-name
  interface HTMLAttributes<T> {
    styleName?: string;
  }
}

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IStoreState {
  global: IGlobal;
  user: IUser;
}
