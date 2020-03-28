import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
}
