import {POST_COLLAPSED_DATA_FAILED, POST_COLLAPSED_DATA_STARTED, POST_COLLAPSED_DATA_SUCCESS } from "../constants/CollapsedConstants"

const initialState = {
    loading : false,
    data : null,
    err : null
}

export const collapsedReducer = (state = initialState,action) => {

    switch(action.type) {
        case POST_COLLAPSED_DATA_STARTED : return {
            ...state,
            loading : true
        };
        case POST_COLLAPSED_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload
        };
        case POST_COLLAPSED_DATA_FAILED : return {
            ...state,
            loading : false,
            err : action.payload
        }
        default : return state;

    }

}