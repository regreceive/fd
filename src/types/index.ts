import * as React from 'react';
import { IGlobal } from '../reducers/globalReducer';
import { IUser } from '../reducers/userReducer';
import { IUi } from '../reducers/uiReducer';

declare module 'react' {
  // tslint:disable-next-line: interface-name
  interface HTMLAttributes<T> {
    styleName?: string;
  }

  // tslint:disable-next-line: interface-name
  interface SVGProps<T>
    extends React.SVGAttributes<T>,
      React.ClassAttributes<T> {
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
  ui: IUi;
  user: IUser;
}
