import { configureStore } from '@reduxjs/toolkit'
import rootReducers from '../redux/reducers/index'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ 
  reducer: rootReducers,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production' 
})
sagaMiddleware.run(rootSaga)

export default store