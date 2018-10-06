import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';

import { IAction } from '../types';
import user from './userReducer';

const appReducer = combineReducers({
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
