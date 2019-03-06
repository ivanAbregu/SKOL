import { combineReducers } from 'redux';
import user from '../containers/Auth/reducers/user';

const dashboardApp = combineReducers({
    user:user,
});

export default dashboardApp;
