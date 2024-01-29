import { combineReducers } from 'redux';
import userReducer from './Alluser';
import profileReducer from './Profile';


const rootReducer = combineReducers({
    user: userReducer,
    admin: profileReducer,
    
});
export default rootReducer;