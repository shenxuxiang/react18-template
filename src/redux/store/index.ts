import { createStore, applyMiddleware } from 'redux';
import reducer from '@/redux/reducers';
import thunk from '../middlewares/thunk';
import logging from '../middlewares/logging';

export default createStore(reducer, applyMiddleware(thunk, logging));
