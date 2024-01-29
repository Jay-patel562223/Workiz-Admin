import { FETCH_PROFILE_DATA,FETCH_PROFILE_SUCCESS,FETCH_PROFILE_FAILURE, UPDATE_ADMIN_PROFILE } from "../../actionType/ProfileType";


const initialState = {
    admin: [],
    isLoading: false,
    error: null,
    // user: {
    //   name: '',
    //   email: '',
    //   avatar: null,
    // },
  };

const profileReducer = (state =initialState, action) =>{
    switch (action.type) {
        
        case FETCH_PROFILE_DATA:
            return {
                ...state,
                isLoading:true,
                error:null
              };
        case FETCH_PROFILE_SUCCESS:
          return{
            ...state,
            admin:action.payload,
            isLoading:false,
            error: null
          };

          case FETCH_PROFILE_FAILURE:
            return{
              ...state,
              isLoading:false,
              admin:[],
              error:action.payload 
            };

            case UPDATE_ADMIN_PROFILE:
              
            return{
              ...state,
              user: {
                ...state.user,
                ...action.payload,
              },
            };
          default:
            return state;

        }
} 
export default profileReducer;