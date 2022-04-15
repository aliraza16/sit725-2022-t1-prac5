

import * as actionTypes from '../../actions/AuthActions/auth'

const initialState = {
    auth: {},
    isAuthenticated: false,
}
const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_AUTH:
            return {
                ...state,
                auth: action.value,
                isAuthenticated: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                auth: {},
                modules: {},
                isAuthenticated: false
            }
    }
    return state
}
export default auth
