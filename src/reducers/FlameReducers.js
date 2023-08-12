import { GET_FLAME_DATA_FAILED, GET_FLAME_DATA_STARTED, GET_FLAME_DATA_SUCCESS } from "../constants/FlameConstants";

const initialState = {
    loading : false,
    data : null,
    err : null
}

export const flameReducer = (state = initialState,action) => {

    switch(action.type) {
        case GET_FLAME_DATA_STARTED : return {
            ...state,
            loading : true
        };
        case GET_FLAME_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload
        };
        case GET_FLAME_DATA_FAILED : return {
            ...state,
            loading : false,
            err : action.payload
        }
        default : return state;

    }

}