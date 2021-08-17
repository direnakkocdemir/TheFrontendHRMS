//Types of actions
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

//Redux action to login
export function userLogin(user) {
    return {
        type: USER_LOGIN,
        payload: user 
    }
}

//Redux action to logout
export function userLogout(user) {
    return {
        type: USER_LOGOUT,
        payload: user
    }
}
