  
import { USER_LOGIN, USER_LOGOUT } from "../actions/authActions";
import { authItem } from "../initialValues/authItem";

const initialState = {
    authItem:authItem,
    token:''
}

export default function authReducer(state=initialState,{type,payload}){
    switch (type) {
        case USER_LOGIN:
            return{
                ...state,
                authItem:[...[{loggedIn:true,user:payload}]],
                token:payload.token
            }
            // let user = state.authItem.find(u=>u.user.id===payload.id)
            // if(user){
            //     return{
            //         ...state
            //     };
            // }else {
            //     return{
            //         ...state,
            //         authItem:[{loggedIn:true,user:{payload}}]
            //     };
            // }
        case USER_LOGOUT:
            return{
                ...state,
                authItem:[{loggedIn:false, user:{id:0, name:"",email:"",userType:0,token:""}}],
                token:''
            };
    
        default:
            return state;
    }
}