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

export interface IUserConfig {
  lang: string;
}

export interface IUser {
  token: string;
  username: string;
  type: 0 | 1,
  role: number;
  config: IUserConfig;
}

export interface IStoreState {
  user: IUser;
}
