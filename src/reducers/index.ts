import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';

import { IAction } from '../types';
import user from './userReducer';
import global from './globalReducer';

const appReducer = combineReducers({
  global,
  user: persistReducer(
    {
      key: 'user',
      storage: session,
    },
    user,
  ),
});

const rootReducer = (state: any, action: IAction) => {
  return appReducer(state, action);
};

export default rootReducer;
