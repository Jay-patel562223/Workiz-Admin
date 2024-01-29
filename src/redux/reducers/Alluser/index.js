import { ADD_USER, DELETE_USER_LIST, FETCH_USER_FAILURE, FETCH_USER_LIST, FETCH_USER_SUCCESS } from "../../actionType/AllUserType";


const initialState = {
    users: [],
    isLoading: false,
    error: null,
  };

const userReducer = (state =initialState, action) =>{
    switch (action.type) {
        case FETCH_USER_LIST:

            return {
                ...state,
                isLoading:true,
                error:null
              };
        case FETCH_USER_SUCCESS:
          return{
            ...state,
            users:action.payload,
            isLoading:false,
            error: null
          };
          case FETCH_USER_FAILURE:
            return{
              ...state,
              isLoading:false,
              users:[],
              error:action.payload 
            };
            case ADD_USER:
              return {
                ...state,
                users:[...state.users, action.payload],
              };
            case DELETE_USER_LIST:
                  const updateData = state.users.filter((row) => row.id !== action.payload);
                   
                  return {
                    ...state,
                    users : updateData,
                }               
          default:
            return state;

        }
} 
export default userReducer;