import { IUser } from '../reducers/userReducer';
import { IGlobal } from '../reducers/globalReducer';

export interface IResponseSchema {
  status: string;
  token?: string;
  toast: IGlobal['toast'];
  data: {};
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

export interface ILoginComplete extends IResponseSchema {
  data: {
    username: IUser['username'];
    side: IUser['side'];
    role: IUser['role'];
  };
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

export interface IAvailableRolesComplete extends IResponseSchema {
  data: {
    roles: IUser['roles'];
  };
}

export function getAvailableRolesComplete(data: IAvailableRolesComplete) {
  return {
    type: 'AVAILABLE_ROLES_COMPLETE',
    payload: data,
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

export interface IRoleComplete extends IResponseSchema {
  data: {
    role: IUser['role'];
    side: IUser['side'];
  };
}

export function updateRoleComplete(data: IRoleComplete) {
  return {
    type: 'UPDATE_ROLE_COMPLETE',
    payload: data,
  };
}

export function getProducerSummary() {
  return {
    type: 'GET_PRODUCER_SUMMARY',
  };
}

export interface IProducerSummaryResponse extends IResponseSchema {
  data: {
    currentState: IUser['currentState'];
    earns: IUser['earns'];
    offer: IUser['offer'];
  };
}

export function producerSummaryComplete(data: IProducerSummaryResponse) {
  return {
    type: 'PRODUCER_SUMMARY_COMPLETE',
    payload: data,
  };
}

export function postOffer(power: number, price: number) {
  return {
    type: 'POST_OFFER',
    payload: { power, price },
  };
}

export interface IResponseJSON extends IResponseSchema {
  data: object;
}

export function postOfferComplete(data: IResponseJSON) {
  return {
    type: 'POST_OFFER_COMPLETE',
    payload: data,
  };
}
