import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from 'reducers';
import rootSagas from 'sagas';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleWare();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleWare));
const store = createStore(rootReducer, enhancer);

sagaMiddleWare.run(rootSagas);

export default store;
