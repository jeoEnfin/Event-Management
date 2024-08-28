import {createStore, combineReducers, applyMiddleware} from 'redux';
import AuthReducers from './reducers';
import {thunk} from 'redux-thunk';
import toastReducer from './toast/ToastReducer';
import toggleReducer from './slice/stateSlice';
import paymentReducer from '../pages/payment/paymentSlice';
const RootReducers: any = combineReducers({
  AuthReducers,
  toast: toastReducer,
  toggle: toggleReducer,
  payment: paymentReducer,
});
export const store = createStore(RootReducers, applyMiddleware(thunk));
