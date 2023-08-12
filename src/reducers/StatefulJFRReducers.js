import { GET_JFR_DATA_FAILED, GET_JFR_DATA_STARTED, GET_JFR_DATA_SUCCESS, POST_JFR_DATA_FAILED, POST_JFR_DATA_STARTED, POST_JFR_DATA_SUCCESS } from "../constants/UploadStatefulJFRConstants";

const initialState = {
    loading : false,
    data : null,
    err : null
}

export const statefulJFRReducer = (state = initialState,action) => {

    switch(action.type) {
        case POST_JFR_DATA_STARTED : return {
            ...state,
            loading : true
        };
        case POST_JFR_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload
        };
        case POST_JFR_DATA_FAILED : return {
            ...state,
            loading : false,
            err : action.payload
        }
        default : return state;

    }

}

export const jfrDataReducer = (state = initialState,action) => {

    switch(action.type) {
        case GET_JFR_DATA_STARTED : return {
            ...state,
            loading : true
        };
        case GET_JFR_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload
        };
        case GET_JFR_DATA_FAILED : return {
            ...state,
            loading : false,
            err : action.payload
        }
        default : return state;

    }

}