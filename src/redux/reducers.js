import { SET_CITIES, SET_USER_NAME, SET_USER_PASSWORD } from "./action";

const initialState = {

    name: '',
    password: '',
    cities:[]
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload }
        case SET_USER_PASSWORD:
            return { ...state, password: action.payload }
        case SET_CITIES:
            return {...state, cities:action.payload}
        default:
            return state;
    }
}

export default userReducer;