import logger from './logger'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
    thunkMiddleware,
    logger,
)