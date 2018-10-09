import { IUser } from '../reducers/userReducer';
import { IGlobal } from '../reducers/globalReducer';

export interface ILogin {
  username: string;
  password: string;
}
export function login(data: ILogin) {
  return {
    type: 'LOGIN',
    payload: data,
  };
}

export interface ILoginComplete {
  token: IUser['token'];
  username: IUser['username'];
  type: IUser['type'];
  role: IUser['role'];
  toast: IGlobal['toast'];
}
export function loginComplete(data: ILoginComplete) {
  return {
    type: 'LOGIN_COMPLETE',
    payload: data,
  };
}
