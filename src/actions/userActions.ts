import * as constants from '../constants';

export interface IUserDataComplete {
  type: constants.USER_DATA_COMPLETE;
  payload: IUserData;
}

interface IUserData {
  role: string;
}

export function userDataComplete(data: IUserData): IUserDataComplete {
  return {
    type: constants.USER_DATA_COMPLETE,
    payload: data,
  };
}
