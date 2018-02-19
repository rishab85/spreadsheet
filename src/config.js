import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './reducer/rootReducer';

export default function configureStore(){
  const middleware = [];
  middleware.push(thunk);
  middleware.push(logger);
  return createStore(
    RootReducer,
    applyMiddleware(...middleware)
  )
}
