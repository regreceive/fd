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

export function chooseRole(role: number) {
  return {
    type: 'CHOOSE_ROLE',
    payload: role,
  };
}

export function updateType() {
  return {
    type: 'UPDATE_TYPE',
  };
}

export interface IRole {
  role: number;
}

export function updateRole(role: IRole) {
  return {
    type: 'UPDATE_ROLE',
    payload: role,
  };
}

export interface IRoleComplete {
  role: IUser['role'];
  toast: IGlobal['toast'];
}
export function updateRoleComplete(role: IRoleComplete) {
  return {
    type: 'UPDATE_ROLE_COMPLETE',
    payload: role,
  };
}
