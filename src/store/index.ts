import {createStore, combineReducers, applyMiddleware} from 'redux';
import AuthReducers from './reducers';
import {thunk} from 'redux-thunk';
import toastReducer from './toast/ToastReducer';
const RootReducers: any = combineReducers({
  AuthReducers,
  toast: toastReducer
});
export const store = createStore(RootReducers, applyMiddleware(thunk));
