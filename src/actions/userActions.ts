import { IUser } from '../reducers/userReducer';
import { IGlobal } from '../reducers/globalReducer';

interface IRequestSchema {
  token: IUser['token'];
  toast: IGlobal['toast'];
}

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

export interface ILoginComplete extends IRequestSchema {
  username: IUser['username'];
  side: IUser['side'];
  role: IUser['role'];
}

export function loginComplete(data: ILoginComplete) {
  return {
    type: 'LOGIN_COMPLETE',
    payload: data,
  };
}

export function getAvailableRoles() {
  return {
    type: 'GET_AVAILABLE_ROLES',
  };
}

export interface IAvailableRolesComplete extends IRequestSchema {
  roles: IUser['roles'];
}

export function getAvailableRolesComplete(data: IAvailableRolesComplete) {
  return {
    type: 'AVAILABLE_ROLES_COMPLETE',
    payload: data,
  };
}

export function chooseRole(role: string) {
  return {
    type: 'CHOOSE_ROLE',
    payload: role,
  };
}

export interface IRole {
  role: string;
}

export function updateRole(role: IRole) {
  return {
    type: 'UPDATE_ROLE',
    payload: role,
  };
}

export interface IRoleComplete extends IRequestSchema {
  role: IUser['role'];
  side: IUser['side'];
}

export function updateRoleComplete(data: IRoleComplete) {
  return {
    type: 'UPDATE_ROLE_COMPLETE',
    payload: data,
  };
}
